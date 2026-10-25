import { Locator, Page } from "@playwright/test";


export class register  {
    private readonly page: Page;
    registerButton: Locator;
    resetButton: Locator;
    heading: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    togglePasswordVisibilityButton: Locator;
    mobilePhoneInput: Locator;
    errorMobilePhone: Locator;
    errorGender: Locator;
    errorPassword: Locator;
    errorFirstname: Locator;
    errorLastname: Locator;
    errorRole: Locator;
    errorPlan: Locator;
    errorNationality: Locator;
    errorCourses: Locator;
    errorEmail: Locator;
    femaleRadio: Locator;
    maleRadio: Locator;
    sqlCheckbox: Locator;
    testManualCheckbox: Locator;
    automateTestCheckbox: Locator;
    automateTest2Checkbox: Locator;
    nationalityButton: Locator;
    selectRoleButton: Locator;
    selectPlanButton: Locator;
    signUpButton: Locator;


    constructor (page:Page) {
        this.page = page;

        //Locators for the registration page elements
        this.registerButton = page.getByRole('link', { name: 'Create an account' })
        this.heading = page.getByRole('heading', { name: 'Kru P\' Beam' }).first()
        this.resetButton = page.getByText('reset')
        this.firstNameInput = page.getByRole('textbox', { name: 'Firstname' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Lastname' })
        this.emailInput = page.getByRole('textbox', { name: 'Email' })
        this.passwordInput = page.locator('#password')
        this.togglePasswordVisibilityButton = page.getByRole('button', { name: 'toggle password visibility' })
        this.mobilePhoneInput = page.getByRole('textbox', { name: 'Mobile Phone' })
        this.femaleRadio = page.getByRole('radio', { name: 'Female' })
        this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true })
        this.sqlCheckbox = page.getByRole('checkbox', { name: 'SQL' })
        this.testManualCheckbox = page.getByRole('checkbox', { name: 'Test Manual' })
        this.automateTestCheckbox = page.getByRole('checkbox', { name: 'Automate Test', exact: true })
        this.automateTest2Checkbox = page.getByRole('checkbox', { name: 'Automate Test2' })
        this.nationalityButton = page.getByRole('button', { name: 'Nationality' })
        this.selectRoleButton = page.getByRole('button', { name: 'Select Role' })
        this.selectPlanButton = page.getByRole('button', { name: 'Select Plan' })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })

        // Locators for required fields on the registration page
        this.errorFirstname = page.locator('#error-firstname')
        this.errorLastname = page.locator('#error-lastname')
        this.errorEmail = page.locator('#error-email')
        this.errorPassword = page.locator('#error-password')
        this.errorMobilePhone = page.locator('#error-mobile-phone')
        this.errorGender = page.locator('#validation-basic-gender')
        this.errorCourses = page.locator('#validation-basic-courses')
        this.errorNationality = page.locator('#validation-basic-nationality')
        this.errorRole = page.locator('#validation-role')
        this.errorPlan = page.locator('#validation-plan')

    }

    async selectNationality(option: string) {
        await this.nationalityButton.click();
        await this.page.getByRole('option', { name: option, exact: true }).click();
    }

    async selectRole(option: string) {
        await this.selectRoleButton.click();
        await this.page.getByRole('option', { name: option, exact: true }).click();
    }

    async selectPlan(option: string) {
        await this.selectPlanButton.click();
        await this.page.getByRole('option', { name: option, exact: true }).click();
    }

}
