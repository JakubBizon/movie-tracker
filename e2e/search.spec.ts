import test, { expect } from "@playwright/test";
import { resetUserData } from "./db";

const MOVIE_URL = "/movie/550-fight-club";

test.beforeEach(async () => {
  await resetUserData();
});

test("pressing enter searches for phrase", async ({ page }) => {
  await page.goto(MOVIE_URL);

  const search = page.getByRole("combobox", { name: "Search movies" });
  await search.pressSequentially("Fight Club");
  await search.press("Enter");

  await expect(page).toHaveURL(/\/search\?q=Fight%20Club/);

  await expect(page.getByText("1 results found for Fight Club")).toBeVisible();

  await page.getByTitle("Fight Club").click();
  await expect(page).toHaveURL("/movie/550-fight-club");
});

test("clicking search suggestion", async ({ page }) => {
  await page.goto(MOVIE_URL);

  const search = page.getByRole("combobox", { name: "Search movies" });
  await search.pressSequentially("Fight Club");
  const suggestion = page.getByRole("option", { name: "Fight Club" });
  await expect(suggestion).toBeVisible();
  await suggestion.click();

  await expect(page).toHaveURL(/\/search\?q=Fight%20Club/);

  await expect(page.getByText("1 results found for Fight Club")).toBeVisible();

  await page.getByTitle("Fight Club").click();
  await expect(page).toHaveURL("/movie/550-fight-club");
});
