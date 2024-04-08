import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "logIn" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test9090@gmail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("testpassword");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.getByRole("link", { name: "reports" }).click();
  await page.getByLabel("Message").click();
  await page.getByLabel("Message").fill("test message");
  await page.getByLabel("Title").click();
  await page.getByLabel("Title").fill("test_report");
  await page.getByLabel("Date").fill("2024-04-07");
  await page.getByLabel("Location").fill("Calgary");
  await page.getByRole("button", { name: "Submit Report" }).click();
});
