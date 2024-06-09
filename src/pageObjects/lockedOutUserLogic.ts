import { expect, Page } from "@playwright/test";

export class InvalidLoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async lockedOutUser() {

        const emailField = this.page.getByRole('textbox', { name: "Username" })
        expect (emailField).toBeVisible()
        await emailField.fill('locked_out_user')

        // Enter password
        const passwordField = this.page.getByRole('textbox', { name: "Password" })
        expect (passwordField).toBeVisible()
        await passwordField.fill('secret_sauce')
    }
    async loginwithInvalidCredentials() {

        const loginButton = this.page.locator('#login-button');
        expect(loginButton).toBeVisible
        await loginButton.click()
        
    }

    async loginError() {

        const loginexception = this.page.getByText('Epic sadface: Sorry, this user has been locked out.')
        await expect(loginexception).toBeInViewport()

    }

    async errorstate() {

        const response = this.page.locator('.error-button')
        await expect (response).toBeVisible()

    }
}
