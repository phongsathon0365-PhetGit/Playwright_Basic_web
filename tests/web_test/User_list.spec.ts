import { test, expect } from "@playwright/test";

const baseUrl = process.env.BASE_URL!;
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
const userListUrl = process.env.USER_LIST_URL!;

test.describe("User list page tests", () => {
  test("ตรวจสอบหน้า User list", async ({ page }) => {
    await test.step("Login ทั้ง email และ password ถูกต้อง", async () => {
      await page.goto(baseUrl);

      await page.fill("#email", username);
      await page.fill('input[name="password"]', password);
      await page.click("#btn-login");

      await expect(
        page.getByRole("link", { name: "Kru P' Beam" }),
      ).toBeVisible();
      await expect(page).toHaveURL(/user\/list/);
    });

    await test.step("Check user list page URL", async () => {
      await expect(page).toHaveURL(userListUrl);
    });

    await test.step("Check Text Lite", async () => {
      await expect(page.getByText("Search Filters")).toBeVisible();
    });
  });

  test("เลือก Search Role", async ({ page }) => {
    await test.step("เลือก Search Role", async () => {
      await page.goto(baseUrl);

      await page.fill("#email", username);
      await page.fill('input[name="password"]', password);
      await page.click("#btn-login");

      await expect(
        page.getByRole("link", { name: "Kru P' Beam" }),
      ).toBeVisible();
      await expect(page).toHaveURL(/user\/list/);

      await page.getByRole('button', { name: 'Select Role' }).click();
      await page.getByRole('option', { name: 'Admin' }).click();
      await expect(page.getByRole('button', { name: 'Search' })).toBeVisible(); 
      await page.getByRole('button', { name: 'Search' }).click();

      
    });
  });
});
