import { expect, Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Method to login as a standard customer
  async standardCustomerLogin(username: string, password: string) {
    try {
      // Enter username
      const emailField = this.page.getByRole('textbox', { name: "Username" })
      expect(await emailField.isVisible()).toBe(true)
      await emailField.fill(username)

      // Enter password
      const passwordField = this.page.getByRole('textbox', { name: "Password" })
      expect(await passwordField.isVisible()).toBe(true)
      await passwordField.fill(password)

      // Submit login form
      const loginButton = this.page.locator('#login-button')
      expect(await loginButton.isVisible()).toBe(true)
      await loginButton.click()
      await this.page.waitForURL('https://www.saucedemo.com/inventory.html')

      // Verify product list visibility (optional)
      const productList = this.page.locator('.inventory_list')
      expect(await productList.isVisible()).toBeTruthy()
    } catch (error) {
      console.error(`An error occurred during login: ${error}`)
      throw error
    }
  }
  
  
}
