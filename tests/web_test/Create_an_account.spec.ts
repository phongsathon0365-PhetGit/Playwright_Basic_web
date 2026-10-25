import { expect, test } from "@playwright/test";
import { register } from "../pages/register";
import testData from "../fixtures/testdate.json";

const baseUrl = process.env.BASE_URL!;
let testDataCommon = testData._common;

test.describe("User Register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Open register", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();

    expect(registerPage.heading).toBeVisible();
  });

  test("Open register and check formate", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();

    expect(registerPage.heading).toBeVisible();
    expect(registerPage.firstNameInput).toBeVisible();
    expect(registerPage.lastNameInput).toBeVisible();
    expect(registerPage.passwordInput).toBeVisible();
    expect(registerPage.mobilePhoneInput).toBeVisible();
    expect(registerPage.femaleRadio).toBeVisible();
    expect(registerPage.maleRadio).toBeVisible();
    expect(registerPage.sqlCheckbox).toBeVisible();
    expect(registerPage.testManualCheckbox).toBeVisible();
    expect(registerPage.automateTestCheckbox).toBeVisible();
    expect(registerPage.automateTest2Checkbox).toBeVisible();
    expect(registerPage.nationalityButton).toBeVisible();
    expect(registerPage.selectRoleButton).toBeVisible();
    expect(registerPage.selectPlanButton).toBeVisible();
    expect(registerPage.signUpButton).toBeVisible();
  });

  test("check reset button", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.resetButton.click();
    expect(registerPage.firstNameInput).toHaveValue("");
    expect(registerPage.lastNameInput).toHaveValue("");
    expect(registerPage.passwordInput).toHaveValue("");
    expect(registerPage.mobilePhoneInput).toHaveValue("");
  });

  test("check input first name field", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.firstNameInput.fill(testDataCommon.firstName);
    expect(registerPage.firstNameInput).toHaveValue(testDataCommon.firstName);
    await registerPage.signUpButton.click();
    expect(registerPage.errorLastname).toBeVisible();
    expect(registerPage.errorLastname).toHaveText("This field is required");
  });

  test("check input first name and last name required error", async ({
    page,
  }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.signUpButton.click();
    expect(registerPage.errorFirstname).toBeVisible();
    expect(registerPage.errorFirstname).toHaveText("This field is required");
    expect(registerPage.errorLastname).toBeVisible();
    expect(registerPage.errorLastname).toHaveText("This field is required");
  });

  test("check input last name field", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.lastNameInput.fill(testDataCommon.lastName);
    expect(registerPage.lastNameInput).toHaveValue(testDataCommon.lastName);
    await registerPage.signUpButton.click();
    expect(registerPage.errorFirstname).toBeVisible();
    expect(registerPage.errorFirstname).toHaveText("This field is required");
  });

  test("check input last name field required error", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.signUpButton.click();
    expect(registerPage.errorLastname).toBeVisible();
    expect(registerPage.errorLastname).toHaveText("This field is required");
  });

  test("check input email field", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.emailInput.fill(testDataCommon.email);
    expect(registerPage.emailInput).toHaveValue(testDataCommon.email);
    await registerPage.signUpButton.click();
    expect(registerPage.errorFirstname).toBeVisible();
    expect(registerPage.errorFirstname).toHaveText("This field is required");
  });

  test("check input email field with invalid email format", async ({
    page,
  }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    for (const invalidEmail of testDataCommon.invalidEmail) {
      await registerPage.emailInput.fill(invalidEmail);
      expect(registerPage.emailInput).toHaveValue(invalidEmail);
      await registerPage.signUpButton.click();
      expect(registerPage.errorEmail).toBeVisible();
      expect(registerPage.errorEmail).toHaveText("Invalid email address");
    }
  });

  test("check input email field required error", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.signUpButton.click();
    expect(registerPage.errorEmail).toBeVisible();
    expect(registerPage.errorEmail).toHaveText("This field is required");
  });

  test("check input password field", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.passwordInput.fill(testDataCommon.password);
    expect(registerPage.passwordInput).toHaveValue(testDataCommon.password);
  });

  test("check input password field required error", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.signUpButton.click();
    expect(registerPage.errorPassword).toBeVisible();
    expect(registerPage.errorPassword).toHaveText("This field is required");
  });

  test("check input mobile phone field", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.mobilePhoneInput.fill(testDataCommon.mobilePhone);
    expect(registerPage.mobilePhoneInput).toHaveValue(
      testDataCommon.mobilePhone,
    );
  });

  test("check input mobile phone field required error", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.signUpButton.click();
    expect(registerPage.errorMobilePhone).toBeVisible();
    expect(registerPage.errorMobilePhone).toHaveText("This field is required");
  });

  test("check Field Gender ", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.femaleRadio.check();
    expect(registerPage.femaleRadio).toBeChecked();
    await registerPage.maleRadio.check();
    expect(registerPage.maleRadio).toBeChecked();
  });

  test("check Checkbox SQL", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.sqlCheckbox.check();
    expect(registerPage.sqlCheckbox).toBeChecked();
  });

  test("check Checkbox Test Manual", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.testManualCheckbox.check();
    expect(registerPage.testManualCheckbox).toBeChecked();
  });

  test("check Checkbox Automate Test", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.automateTestCheckbox.check();
    expect(registerPage.automateTestCheckbox).toBeChecked();
  });

  test("check Checkbox Automate Test 2", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.automateTest2Checkbox.check();
    expect(registerPage.automateTest2Checkbox).toBeChecked();
  });

  test("check Dropdown Nationlity", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.selectNationality("Thai");
    await expect(registerPage.nationalityButton).toHaveText("Thai");
  });

  test("check Dropdown Role", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.selectRole("Admin");
    await expect(registerPage.selectRoleButton).toHaveText("Admin");
  });

  test("check Dropdown Plan", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.selectPlan("Basic");
    await expect(registerPage.selectPlanButton).toHaveText("Basic");
  });

  test("ตรวจสอบการกรอกข้อมูลถูกต้องครบถ้วน", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.firstNameInput.fill("John");
    await registerPage.lastNameInput.fill("Doe");
    await registerPage.emailInput.fill("john.doe@example.com");
    await registerPage.passwordInput.fill("Password123");
    await registerPage.mobilePhoneInput.fill("0123456789");
    await registerPage.femaleRadio.check();
    await registerPage.sqlCheckbox.check();
    await registerPage.testManualCheckbox.check();
    await registerPage.automateTestCheckbox.check();
    await registerPage.automateTest2Checkbox.check();
    await registerPage.selectNationality("Thai");
    await registerPage.selectRole("Admin");
    await registerPage.selectPlan("Basic");
    await registerPage.signUpButton.click();
    await expect(registerPage.errorFirstname).not.toBeVisible();
    await expect(registerPage.errorLastname).not.toBeVisible();
    await expect(registerPage.errorEmail).not.toBeVisible();
    await expect(registerPage.errorPassword).not.toBeVisible();
    await expect(registerPage.errorMobilePhone).not.toBeVisible();
    await expect(registerPage.errorGender).not.toBeVisible();
    await expect(registerPage.errorCourses).not.toBeVisible();
    await expect(registerPage.errorNationality).not.toBeVisible();
    await expect(registerPage.errorRole).not.toBeVisible();
    await expect(registerPage.errorPlan).not.toBeVisible();

    const successDialog = page.getByRole("dialog");
    await expect(successDialog).toBeVisible();
    await expect(successDialog).toContainText("Register Success");
    await successDialog.getByRole("button", { name: "OK!", exact: true }).click();
  });

  test("ตรวจสอบการกรอกข้อมูลไม่ครบถ้วน", async ({ page }) => {
    const registerPage = new register(page);
    await registerPage.registerButton.click();
    await registerPage.signUpButton.click();
    await expect(registerPage.errorFirstname).toBeVisible();
    await expect(registerPage.errorLastname).toBeVisible();
    await expect(registerPage.errorEmail).toBeVisible();
    await expect(registerPage.errorPassword).toBeVisible();
    await expect(registerPage.errorMobilePhone).toBeVisible();
    await expect(registerPage.errorGender).toBeVisible();
    await expect(registerPage.errorCourses).toBeVisible();
    await expect(registerPage.errorNationality).toBeVisible();
    await expect(registerPage.errorRole).toBeVisible();
    await expect(registerPage.errorPlan).toBeVisible();
  });



});
