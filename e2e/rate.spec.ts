import test, { expect, Page, Response } from "@playwright/test";
import { resetUserData } from "./db";

const MOVIE_URL = "/movie/550-fight-club";

const rateButton = (page: Page) =>
  page.getByRole("button", { name: "Rate", exact: true });

const ratedButton = (page: Page, score: number) =>
  page.getByRole("button", { name: `Rated: ${score}`, exact: true });

const isRateReq = (response: Response) =>
  response.request().method() === "POST" && response.url().includes(MOVIE_URL);

test.beforeEach(async () => {
  await resetUserData();
});

test("saves a rating and keeps it after reload", async ({ page }) => {
  await page.goto(MOVIE_URL);

  await rateButton(page).click();

  const dialog = page.getByRole("dialog", { name: "Rating Dialog" });
  await expect(dialog).toBeVisible();

  await dialog.getByRole("button", { name: "Rate 5 out of 10 stars" }).click();

  const saveButton = dialog.getByRole("button", { name: "Save rating" });
  await expect(saveButton).toBeEnabled();

  const [saveRes] = await Promise.all([
    page.waitForResponse(isRateReq),
    saveButton.click(),
  ]);
  expect(saveRes.ok()).toBeTruthy();

  await expect(ratedButton(page, 5)).toBeVisible();

  await page.reload();
  await expect(ratedButton(page, 5)).toBeVisible();
});

test("updates a rating from 5 to 9", async ({ page }) => {
  await page.goto(MOVIE_URL);

  await rateButton(page).click();
  const dialog = page.getByRole("dialog", { name: "Rating Dialog" });
  await dialog.getByRole("button", { name: "Rate 5 out of 10 stars" }).click();

  const saveButton = dialog.getByRole("button", { name: "Save rating" });
  const [saveRes] = await Promise.all([
    page.waitForResponse(isRateReq),
    saveButton.click(),
  ]);
  expect(saveRes.ok()).toBeTruthy();
  await expect(ratedButton(page, 5)).toBeVisible();

  await ratedButton(page, 5).click();
  await expect(dialog).toBeVisible();
  await expect(saveButton).toBeDisabled();

  await dialog.getByRole("button", { name: "Rate 9 out of 10 stars" }).click();
  await expect(saveButton).toBeEnabled();

  const [updateRes] = await Promise.all([
    page.waitForResponse(isRateReq),
    saveButton.click(),
  ]);
  expect(updateRes.ok()).toBeTruthy();

  await expect(ratedButton(page, 9)).toBeVisible();
  await page.reload();
  await expect(ratedButton(page, 9)).toBeVisible();
});

test("rated movies appears in MyRatings", async ({ page }) => {
  await page.goto(MOVIE_URL);

  await rateButton(page).click();

  const dialog = page.getByRole("dialog", { name: "Rating Dialog" });
  await expect(dialog).toBeVisible();

  await dialog.getByRole("button", { name: "Rate 5 out of 10 stars" }).click();

  const saveButton = dialog.getByRole("button", { name: "Save rating" });
  await expect(saveButton).toBeEnabled();

  const [saveRes] = await Promise.all([
    page.waitForResponse(isRateReq),
    saveButton.click(),
  ]);
  expect(saveRes.ok()).toBeTruthy();

  await expect(ratedButton(page, 5)).toBeVisible();

  await page.goto("/my-ratings");

  await expect(page.getByRole("img", { name: "Fight Club" })).toBeVisible();

  await expect(page.getByRole("button", { name: "5 You" })).toBeVisible();
});

test("removes rating, rating disappears from MyRatings page", async ({
  page,
}) => {
  await page.goto(MOVIE_URL);

  await rateButton(page).click();

  const dialog = page.getByRole("dialog", { name: "Rating Dialog" });
  await expect(dialog).toBeVisible();

  await dialog.getByRole("button", { name: "Rate 5 out of 10 stars" }).click();

  const saveButton = dialog.getByRole("button", { name: "Save rating" });
  await expect(saveButton).toBeEnabled();

  const [saveRes] = await Promise.all([
    page.waitForResponse(isRateReq),
    saveButton.click(),
  ]);
  expect(saveRes.ok()).toBeTruthy();

  await expect(ratedButton(page, 5)).toBeVisible();

  await ratedButton(page, 5).click();
  await expect(dialog).toBeVisible();

  await dialog.getByRole("button", { name: "Remove my rating" }).click();

  await expect(rateButton(page)).toBeVisible();

  await page.reload();
  await expect(rateButton(page)).toBeVisible();

  await page.goto("/my-ratings");
  await expect(
    page.getByText("Rate a movie to see it appear here"),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Fight Club" })).not.toBeVisible();
});
