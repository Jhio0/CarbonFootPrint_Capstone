import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/logIn");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test9090@gmail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("testpassword");
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await page.getByRole("link", { name: "news" }).click();
});
