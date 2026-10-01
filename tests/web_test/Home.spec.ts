import { test, expect } from "@playwright/test";

const baseUrl = process.env.BASE_URL!;
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;

test.describe("Home page tests", () => {
  test("Welcome to Kru ", async ({ page }) => {
    await page.goto(baseUrl);

    await test.step("Check page title", async () => {
      await expect(page.locator("text=Welcome to Kru")).toBeVisible();
    });

    await test.step("Check login form visibility", async () => {
      await expect(page.locator("form")).toBeVisible();

      await expect(page.locator("#email")).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.locator("#btn-login")).toBeVisible();
    });
  });

  test("Login ไม่ใส่ email & password", async ({ page }) => {
    await test.step("Login ไม่ใส่ email", async () => {
      await page.goto(baseUrl);

      await page.fill("#email", "");
      await page.fill('input[name="password"]', "validpassword");
      await page.click("#btn-login");

      await expect(page.locator("text=email is a required field"),).toBeVisible();
    });

    await test.step("Login ไม่ใส่ password", async () => {
      await page.goto(baseUrl);

      await page.fill("#email", "validemail@example.com");
      await page.fill('input[name="password"]', "");
      await page.click("#btn-login");

      await expect(page.locator("text=password must be at least 5 characters"),).toBeVisible();
    });
  });

 

  test("Login ไม่ใส่ทั้ง email และ password ", async ({ page }) => {
    await test.step("Login ทั้ง email และ password ไม่ใส่", async () => {
      await page.goto(baseUrl);

      await page.fill("#email", "");
      await page.fill('input[name="password"]', "");
      await page.click("#btn-login");

      await expect(page.locator("text=email is a required field"),).toBeVisible();
      await expect(page.locator("text=password must be at least 5 characters"),).toBeVisible();
    });
  });

  test("Login ทั้ง email และ password ถูกต้อง", async ({ page }) => {
    await test.step("Login ทั้ง email และ password ถูกต้อง", async () => {
      await page.goto(baseUrl);

      await page.fill("#email", username);
      await page.fill('input[name="password"]', password);
      await page.click("#btn-login");

      await expect(page.getByRole("link", { name: "Kru P' Beam" }),).toBeVisible();
      await expect(page).toHaveURL(/user\/list/);
    });
  });
});
