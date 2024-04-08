import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/logIn");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test9090@gmail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("testpassword");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.getByRole("link", { name: "CFCalc" }).click();
  await page
    .getByLabel("RegionSelect your province/")
    .selectOption("Alberta (AB)");
  await page.getByRole("button", { name: "Home" }).click();
  await page.getByPlaceholder("Electricity used (kWh)").click();
  await page.getByPlaceholder("Electricity used (kWh)").fill("1232");
  await page.getByPlaceholder("Natural gas used (GJ)").click();
  await page.getByPlaceholder("Natural gas used (GJ)").fill("1232");
  await page.getByRole("button", { name: "Calculate" }).click();
  await page.getByRole("button", { name: "Flights" }).click();
  await page.getByPlaceholder("Enter Origin IATA Code").click();
  await page.getByPlaceholder("Enter Origin IATA Code").fill("YYc");
  await page.getByPlaceholder("Destination Origin IATA Code").click();
  await page.getByPlaceholder("Destination Origin IATA Code").fill("YVr");
  await page.getByRole("button", { name: "Add Flight" }).click();
  await page.getByRole("button", { name: "Vehicle" }).click();
  await page.getByPlaceholder("Enter Mileage in Km").click();
  await page.getByPlaceholder("Enter Mileage in Km").fill("1232");
  await page.getByRole("button", { name: "Calculate" }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Save Results" }).click();
});
