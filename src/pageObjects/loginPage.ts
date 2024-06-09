import { expect, Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  

  async standardCustomerLogin(username: string, password: string) {

    try {
    // Enter username
    const emailField = this.page.getByRole('textbox', { name: "Username" })
    expect (emailField).toBeVisible()
    await emailField.fill(username)

    // Enter password
    const passwordField = this.page.getByRole('textbox', { name: "Password" })
    expect (passwordField).toBeVisible()
    await passwordField.fill(password)

    // Submit login form
    const loginButton = this.page.locator('#login-button')
    expect (loginButton).toBeVisible()
    await loginButton.click()
    await this.page.waitForURL('https://www.saucedemo.com/inventory.html')

    // Verify product list visibility (optional)
    const productList = this.page.locator('.inventory_list')
    expect(await productList.isVisible()).toBeTruthy();

  } catch (error) {
    console.error('An error occurred during login: ${error}')
    throw error
  }
  }

async lockedoutuser() {
  const usernameField = this.page.getByRole('textbox', { name: "Username" })
    await usernameField.fill('locked_out_user')
  const userNameFieldValue = await usernameField.inputValue()
  expect(userNameFieldValue).toEqual('locked_out_user')

}
}

