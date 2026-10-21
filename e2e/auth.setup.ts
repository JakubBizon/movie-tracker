import { test as setup } from "@playwright/test";
import { TEST_USER } from "./db";

const headers = { Origin: "http://localhost:3000" };

setup("create user and log in", async ({ page }) => {
  await page.request.post("/api/auth/sign-up/email", {
    data: TEST_USER,
    headers,
  });

  const res = await page.request.post("/api/auth/sign-in/email", {
    data: { email: TEST_USER.email, password: TEST_USER.password },
    headers,
  });

  if (!res.ok())
    throw new Error(`Login failed: ${res.status()} ${await res.text()}`);

  await page.context().storageState({ path: "e2e/.auth/user.json" });
});
