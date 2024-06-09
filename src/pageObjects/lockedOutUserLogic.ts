import { expect, Page } from "@playwright/test";

export class InvalidLoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Method to login as a locked out user
    async lockedOutUser() {
        try {
            const emailField = this.page.getByRole('textbox', { name: "Username" })
            expect(await emailField.isVisible()).toBe(true)
            await emailField.fill('locked_out_user')

            // Enter password
            const passwordField = this.page.getByRole('textbox', { name: "Password" })
            expect(await passwordField.isVisible()).toBe(true)
            await passwordField.fill('secret_sauce')
        } catch (error) {
            console.error(`An error occurred during locked out user login: ${error}`)
            throw error
        }
    }

    // Method to login with invalid credentials
    async loginwithInvalidCredentials() {
        try {
            const loginButton = this.page.locator('#login-button')
            expect(await loginButton.isVisible()).toBe(true)
            await loginButton.click()
        } catch (error) {
            console.error(`An error occurred during login with invalid credentials: ${error}`)
            throw error
        }
    }

    // Method to check for login error
    async loginError() {
        try {
            const loginexception = this.page.getByText('Epic sadface: Sorry, this user has been locked out.')
            expect(await loginexception.isVisible()).toBe(true)
        } catch (error) {
            console.error(`An error occurred during login error check: ${error}`)
            throw error
        }
    }

    // Method to check for error state
    async errorstate() {
        try {
            const response = this.page.locator('.error-button')
            expect(await response.isVisible()).toBe(true)
        } catch (error) {
            console.error(`An error occurred during error state check: ${error}`)
            throw error
        }
    }
}
