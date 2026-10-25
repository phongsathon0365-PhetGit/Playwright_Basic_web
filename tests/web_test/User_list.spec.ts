import { expect, test, type Page } from "@playwright/test";
import { login } from "../helpers/login";

const baseUrl = process.env.BASE_URL!;
const userListUrl = process.env.USER_LIST_URL!;
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
const roles = ["Admin", "Author", "Editor", "Maintainer", "Subscriber"];
const plans = ["Basic", "Company", "Enterprise", "Team"];
const statuses = ["Pending", "Active", "Inactive"];

async function selectFilterAndSearch(
  page: Page,
  filterName: string,
  value: string,
): Promise<void> {
  await page.getByRole("button", { name: filterName }).click();
  await page.getByRole("option", { name: value, exact: true }).click();

  const searchButton = page.getByRole("button", {
    name: "Search",
    exact: true,
  });
  await expect(searchButton).toBeVisible();
  await searchButton.click();
}

async function expectFilteredColumn(
  page: Page,
  dataField: string,
  expectedValue: string,
): Promise<void> {
  const cells = page.locator(`[role="cell"][data-field="${dataField}"]`);
  await expect(cells.first()).toBeVisible();

  const expectedTexts = Array.from(
    { length: await cells.count() },
    () => expectedValue.toLowerCase(),
  );
  await expect(cells).toHaveText(expectedTexts);
}

async function clearFilters(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await expect(
    page.locator(".MuiDataGrid-virtualScrollerContent"),
  ).toBeVisible();
}

test.describe("User list page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await login(page, username, password);

    await expect(page.getByRole("link", { name: "Kru P' Beam" })).toBeVisible();
  });

  test("ตรวจสอบหน้า User list", async ({ page }) => {
    await test.step("ตรวจสอบหน้า User list", async () => {
      await expect(page).toHaveURL(/user\/list/);
    });

    await test.step("Check user list page URL", async () => {
      await expect(page).toHaveURL(userListUrl);
    });

    await test.step("Check Text Lite", async () => {
      await expect(page.getByText("Search Filters")).toBeVisible();
    });
  });

  test("ตรวจสอบ Pagination", async ({ page }) => {
    const displayedRows = page.getByText(/^\d+[–-]\d+ of \d+$/);
    const previousPageButton = page.getByRole("button", {
      name: "Go to previous page",
    });
    const nextPageButton = page.getByRole("button", {
      name: "Go to next page",
    });
    const firstDataRow = page.locator('[role="row"][data-rowindex]').first();

    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(firstDataRow).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Rows per page: 10/ }),
    ).toBeVisible();
    await expect(displayedRows).toHaveText(/^1[–-]10 of \d+$/);
    await expect(previousPageButton).toBeDisabled();
    await expect(nextPageButton).toBeEnabled();

    await nextPageButton.click();
    await expect(displayedRows).toHaveText(/^11[–-]\d+ of \d+$/);
    await expect(previousPageButton).toBeEnabled();

    await previousPageButton.click();
    await expect(displayedRows).toHaveText(/^1[–-]10 of \d+$/);
    await expect(previousPageButton).toBeDisabled();
  });

  test("ตรวจสอบการค้นหาด้วย Search Role", async ({ page }) => {
    for (const role of roles) {
      await test.step(`เลือกและค้นหาด้วย role: ${role}`, async () => {
        await selectFilterAndSearch(page, "Select Role", role);
        await expectFilteredColumn(page, "role", role);
      });
    }

    await clearFilters(page);
  });

  test("ตรวจสอบการค้นหาด้วย Select Plan", async ({ page }) => {
    for (const plan of plans) {
      await test.step(`ค้นหาด้วย plan: ${plan}`, async () => {
        await selectFilterAndSearch(page, "Select Plan", plan);
        await expectFilteredColumn(page, "currentPlan", plan);
      });
    }
    await clearFilters(page);
  });

  test("ตรวจสอบการค้นหาด้วย Select Status", async ({ page }) => {
    for (const status of statuses) {
      await test.step(`ค้นหาด้วย status: ${status}`, async () => {
        await selectFilterAndSearch(page, "Select Status", status);
        await expectFilteredColumn(page, "status", status);
      });
    }
    await clearFilters(page);
  });
});
