import test, { expect, Page } from "@playwright/test";
import { resetUserData } from "./db";

const MOVIE_URL = "/movie/550-fight-club";

const addButton = (page: Page) =>
  page.getByRole("button", { name: /to favorites/i }).first();
const removeButton = (page: Page) =>
  page.getByRole("button", { name: /from favorites/i }).first();

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

  await addButton(page).click();
  await removeButton(page).click();
  await expect(addButton(page)).toBeVisible();

  await page.reload();
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
