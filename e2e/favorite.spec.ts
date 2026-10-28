import test, { expect, Page, Response } from "@playwright/test";
import { resetUserData, seedFavorite } from "./db";

const MOVIE_URL = "/movie/550-fight-club";

const addButton = (page: Page) =>
  page.getByRole("button", { name: /to favorites/i }).first();
const removeButton = (page: Page) =>
  page.getByRole("button", { name: /from favorites/i }).first();

const isFavReq = (r: Response) =>
  r.request().method() === "POST" && r.url().includes(MOVIE_URL);

test.beforeEach(async () => {
  await resetUserData();
});

test("adds movie to favorites and stays after reload", async ({ page }) => {
  await page.goto(MOVIE_URL);

  await addButton(page).click();
  await expect(removeButton(page)).toBeVisible();

  await page.reload();
  await expect(removeButton(page)).toBeVisible();
});

test("removes movie from favorites", async ({ page }) => {
  await page.goto(MOVIE_URL);

  const [addRes] = await Promise.all([
    page.waitForResponse(isFavReq),
    addButton(page).click(),
  ]);
  expect(addRes.ok()).toBeTruthy();

  const [removeRes] = await Promise.all([
    page.waitForResponse(isFavReq),
    removeButton(page).click(),
  ]);
  expect(removeRes.ok()).toBeTruthy();

  await expect(addButton(page)).toBeVisible();

  await page.reload();
  await expect(addButton(page)).toBeVisible();
});

test("added movies appears in MyLists in favorites tab", async ({ page }) => {
  await page.goto(MOVIE_URL);

  const [addRes] = await Promise.all([
    page.waitForResponse(isFavReq),
    addButton(page).click(),
  ]);
  expect(addRes.ok()).toBeTruthy();

  await page.reload();
  await expect(removeButton(page)).toBeVisible();

  await page.goto("/my-lists");

  await expect(page.getByRole("img", { name: "Fight Club" })).not.toBeVisible();

  await page.getByRole("link", { name: "Favorites" }).click();

  await expect(page.getByRole("img", { name: "Fight Club" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("img", { name: "Fight Club" })).toBeVisible();
});

test("removing a favorite on My Lists clears it on the movie page", async ({
  page,
}) => {
  await seedFavorite();
  await page.goto("/my-lists?tab=favorites");
  await page.getByRole("img", { name: "Fight Club" }).hover();
  await expect(
    page.getByRole("button", { name: "Remove from list" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Remove from list" }).click();
  await expect(page.getByRole("img", { name: "Fight Club" })).toHaveCount(0);
  await page.goto(MOVIE_URL);
  await expect(addButton(page)).toBeVisible();
});

test.describe("not logged in", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("clicking favorites opens auth dialog", async ({ page }) => {
    await page.goto(MOVIE_URL);

    await addButton(page).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
