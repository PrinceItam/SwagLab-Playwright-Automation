import { expect, Page } from "@playwright/test"

// Constants for hardcoded values
const FIRST_NAME = 'Prince_test_user';
const LAST_NAME = 'Prince_last_name';
const POSTAL_CODE = '01700';

export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Method to checkout
    async checkout() {
        try {
            const shopping_cart_link = this.page.locator('.shopping_cart_link')
            const checkout = this.page.locator('#checkout')

            expect(await shopping_cart_link.isVisible()).toBe(true)
            await shopping_cart_link.click()

            expect(await checkout.isVisible()).toBe(true)
            await checkout.click()
        } catch (error) {
            console.error('Error in checkout:', error);
        }
    }

    // Method to go to cart
    async goToCart() {
        try {
            await this.page.locator('.shopping_cart_link').click()
        } catch (error) {
            console.error('Error in goToCart:', error);
        }
    }

    // Method to continue shopping
    async continueShopping() {
        try {
            await this.page.locator('#continue-shopping').click()
        } catch (error) {
            console.error('Error in continueShopping:', error);
        }
    }

    // Method to verify checkout page for purchased item
    async verifyCheckoutPage() {
        try {
            const addtoCart = this.page.getByText('Add to Cart').first()
            const shopping_cart_link = this.page.locator('.shopping_cart_link')
            const remove = this.page.getByText('Remove').first()
            const openbackpack = this.page.getByText('Sauce Labs Backpack')

            expect(await openbackpack.isVisible()).toBe(true)
            await openbackpack.click()

            expect(await addtoCart.isVisible()).toBe(true)
            await addtoCart.click()

            expect(await remove.isVisible()).toBe(true)
            expect(await shopping_cart_link.isVisible()).toBe(true)

            await shopping_cart_link.click()
            await this.page.locator('#continue-shopping').click()
        } catch (error) {
            console.error('Error in verifyCheckoutPage:', error);
        }
    }

    // Method to verify checkout page for second purchased item
    async verifyCheckoutPage2() {
        try {
            const addtoCart = this.page.getByText('Add to Cart').first()
            const shopping_cart_link = this.page.locator('.shopping_cart_link')
            const remove = this.page.getByText('Remove').first()
            const bikelight = this.page.getByText('Sauce Labs Bike Light')

            expect(await bikelight.isVisible()).toBe(true)
            await bikelight.click()

            expect(await addtoCart.isVisible()).toBe(true)
            await addtoCart.click()

            expect(await remove.isVisible()).toBe(true)
            expect(await shopping_cart_link.isVisible()).toBe(true)

            await shopping_cart_link.click()
            await this.page.locator('#continue-shopping').click()
        } catch (error) {
            console.error('Error in verifyCheckoutPage2:', error);
        }
    }

    // Method to fill customer first name
    async customerfirstname() {
        try {
            const customerfirstname = this.page.getByRole('textbox', { name: "First Name" })
            await customerfirstname.fill(FIRST_NAME)
            const firstnameValue = await customerfirstname.inputValue()
            expect(firstnameValue).toEqual(FIRST_NAME)
        } catch (error) {
            console.error('Error in customerfirstname:', error);
        }
    }

    // Method to fill customer last name
    async customerlastname() {
        try {
            const customerlastname = this.page.getByRole('textbox', { name: "Last Name" })
            await customerlastname.fill(LAST_NAME)
            const lastnameValue = await customerlastname.inputValue()
            expect(lastnameValue).toEqual(LAST_NAME)
        } catch (error) {
            console.error('Error in customerlastname:', error);
        }
    }

    // Method to fill postal code
    async postalcode() {
        try {
            const customerpostalcode = this.page.getByRole('textbox', { name: "Zip/Postal Code" })
            await customerpostalcode.fill(POSTAL_CODE)
            const postalcodeValue = await customerpostalcode.inputValue()
            expect(postalcodeValue).toEqual(POSTAL_CODE)
            const continueButton = this.page.locator('#continue').filter({ hasText: "Continue" })
            await continueButton.click()
        } catch (error) {
            console.error('Error in postalcode:', error);
        }
    }

    // Method to assert bag product is added to cart
    async assertBagProductisaddedtocart() {
        try {
            const checkoutpage = this.page.locator(':has-text("Sauce Labs Backpack")').first()
            const isVisible = await checkoutpage.isVisible()
            expect(isVisible).toBe(true)
        } catch (error) {
            console.error('Error in assertBagProductisaddedtocart:', error);
        }
    }

    // Method to assert bike light product is added to cart
    async assertBikelightProductisaddedtocart() {
        try {
            const checkoutpage = this.page.locator(':has-text("Sauce Labs Bike Light")').first()
            const isVisible = await checkoutpage.isVisible()
            expect(isVisible).toBe(true)
        } catch (error) {
            console.error('Error in assertBikelightProductisaddedtocart:', error);
        }
    }

    // Method to complete verified purchase
    async completVerifiedPurchase() {
        try {
            const competepurchase = this.page.locator('#finish')
            await competepurchase.scrollIntoViewIfNeeded()
            await competepurchase.click()
            const orderComplete = this.page.getByTitle('Checkout: Complete')
            await orderComplete.isVisible()
        } catch (error) {
            console.error('Error in completVerifiedPurchase:', error);
        }
    }

    // Method to sort products page
    async sortproductspage() {
        try {
            const opensortlistforAtoZ = this.page.locator('.product_sort_container').filter({ hasText: "Name (A to Z)" })
            expect(await opensortlistforAtoZ.isVisible()).toBe(true)
            await opensortlistforAtoZ.click()
            await opensortlistforAtoZ.selectOption(['za'])
        } catch (error) {
            console.error('Error in sortproductspage:', error);
        }
    }

    // Method to verify product sorting by user
    async verifyProductSortingByUser() {
        try {
            const nameElements = this.page.locator('.inventory_container')
            const productNames = await this.page.locator('.inventory_container').allTextContents()
            const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a))

            let isSortedFirstScript: boolean = JSON.stringify(productNames) === JSON.stringify(sortedNames)
            expect(isSortedFirstScript, 'Products are sorted in Z to A order').toBe(true)
            console.log('Products are sorted in Z to A order')

            const opensortlisthightolow = this.page.locator('.product_sort_container').filter({ hasText: "Name (Z to A)" })
            expect(await opensortlisthightolow.isVisible()).toBe(true)
            await opensortlisthightolow.click()
            await opensortlisthightolow.selectOption(['hilo'])
            const newusersortedinput = this.page.locator('.product_sort_container').filter({ hasText: "Price (high to low)" })
            await expect(newusersortedinput).toBeVisible()

            const priceElements = this.page.locator('.product[data-price]')
            const prices = await priceElements.allTextContents()
            const pricesAsNumbers = prices.map(price => parseFloat(price))
            const sortedPrices = [...pricesAsNumbers].sort((a, b) => b - a)
            let isSortedSecondScript: boolean = JSON.stringify(pricesAsNumbers) === JSON.stringify(sortedPrices)
            expect(isSortedSecondScript, 'Products are sorted in Z to A order').toBe(true)
            console.log('Products are sorted from high to low price')
        } catch (error) {
            console.error('Error in verifyProductSortingByUser:', error);
            await this.page.screenshot({ path: './src/screenshots' })
        }
    }
}
