import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/logIn");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test9090@gmail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("testpassword");
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await page.getByRole("link", { name: "forum" }).click();
  await page.locator("#title").click();
  await page.locator("#title").fill("playwright Test");
  await page.getByLabel("Content:").click();
  await page.getByLabel("Content:").fill("e2e test");
  //     await page.getByRole("button", { name: "CREATE THREAD" }).click();
  //     await page.getByRole("button", { name: "Edit" }).click();
  //     await page.locator("#editTitle").click();
  //     await page.locator("#editTitle").fill("playwright test (edited)");
  //     await page.locator("#editContent").click();
  //     await page.locator("#editContent").fill("e2e test (edited)");
  //     await page.getByRole("button", { name: "Save" }).click();
  //   await page.getByRole("button", { name: "Delete" }).click();
});
