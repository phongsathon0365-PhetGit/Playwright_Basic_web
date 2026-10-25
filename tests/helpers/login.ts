import { Page } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";

export async function login(page: Page, username: string, password: string): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
}
