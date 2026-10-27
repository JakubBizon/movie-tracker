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
