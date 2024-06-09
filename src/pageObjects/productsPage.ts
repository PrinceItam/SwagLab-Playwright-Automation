import { expect, Page } from "@playwright/test"
import exp from "constants";


export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async checkout() {
        const shopping_cart_link = this.page.locator('.shopping_cart_link')
        const checkout = this.page.locator('#checkout')

        expect(shopping_cart_link).toBeVisible()
        await shopping_cart_link.click()

        expect(checkout).toBeVisible()
        await checkout.click()

    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click()
    }

    async continueShopping() {
        await this.page.locator('#continue-shopping').click()
    }

    async verifyCheckoutPage() {

        const addtoCart = this.page.getByText('Add to Cart').first()
        const shopping_cart_link = this.page.locator('.shopping_cart_link')
        const remove = this.page.getByText('Remove').first()
        const openbackpack = this.page.getByText('Sauce Labs Backpack')

        expect(openbackpack).toBeVisible()
        await openbackpack.click()

        expect(addtoCart).toBeVisible()
        await addtoCart.click()

        expect(remove).toBeVisible()
        await expect(shopping_cart_link).toBeVisible()

        await shopping_cart_link.click()
        await this.page.locator('#continue-shopping').click()
    }

    async verifyCheckoutPage2() {


        const addtoCart = this.page.getByText('Add to Cart').first();
        const shopping_cart_link = this.page.locator('.shopping_cart_link')
        const remove = this.page.getByText('Remove').first();
        const bikelight = this.page.getByText('Sauce Labs Bike Light');

        expect(bikelight).toBeVisible()
        await bikelight.click();

        expect(addtoCart).toBeVisible()
        await addtoCart.click();

        expect(remove).toBeVisible();

        expect(shopping_cart_link).toBeVisible()
        await shopping_cart_link.click();
        await this.page.locator('#continue-shopping').click()

    }

    async customerfirstname() {
        const customerfirstname = this.page.getByRole('textbox', { name: "First Name" })
        await customerfirstname.fill('Prince_test_user')
        const firstnameValue = await customerfirstname.inputValue()
        expect(firstnameValue).toEqual('Prince_test_user')
    }


    async customerlastname() {
        const customerlastname = this.page.getByRole('textbox', { name: "Last Name" })
        await customerlastname.fill('Prince_last_name');
        const lastnameValue = await customerlastname.inputValue()
        expect(lastnameValue).toEqual('Prince_last_name')
    }

    async postalcode() {
        const customerpostalcode = this.page.getByRole('textbox', { name: "Zip/Postal Code" })
        await customerpostalcode.fill('01700')
        const postalcodeValue = await customerpostalcode.inputValue()
        expect(postalcodeValue).toEqual('01700')
        const continueButton = this.page.locator('#continue').filter({ hasText: "Continue" })
        await continueButton.click()

    }


    async assertBagProductisaddedtocart() {

        const checkoutpage = this.page.locator(':has-text("Sauce Labs Backpack")').first()
        const isVisible = await checkoutpage.isVisible();
        expect(isVisible).toBe(true);


    }

    async assertBikelightProductisaddedtocart() {

        //const continueButton = this.page.locator('#continue').filter({ hasText: "Continue" })
        //await continueButton.click()
        const checkoutpage = this.page.locator(':has-text("Sauce Labs Bike Light")').first()
        const isVisible = await checkoutpage.isVisible()
        expect(isVisible).toBe(true);

    }

    async completVerifiedPurchase() {

        const competepurchase = this.page.locator('#finish')
        await competepurchase.scrollIntoViewIfNeeded()
        await competepurchase.click()
        const orderComplete = this.page.getByTitle('Checkout: Complete')
        await orderComplete.isVisible()

    }

    async sortproductspage() {

        const opensortlistforAtoZ = this.page.locator('.product_sort_container').filter({ hasText: "Name (A to Z)" })
        expect(opensortlistforAtoZ).toBeVisible()
        await opensortlistforAtoZ.click()
        // Sort inventory list from list by Z to A
        await opensortlistforAtoZ.selectOption(['za']);

    }

    async verifyProductSortingByUser() {
        try {
            // Extract text from elements
            const nameElements = this.page.locator('.inventory_container')
            // Get all elements handles by array
            const productNames = await this.page.locator('.inventory_container').allTextContents()
            const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a))
            let isSortedFirstScript: boolean = JSON.stringify(productNames) === JSON.stringify(sortedNames)
            expect(isSortedFirstScript, 'Products are sorted in Z to A order').toBe(true)
            console.log('Products are sorted in Z to A order')
        }
        catch (error) {
            console.error('An error occurred', error)
            await this.page.screenshot({ path: 'src/screenshots' })

        }

        // Verfiy sorting investory items from High to low
        try {

            const opensortlisthightolow = this.page.locator('.product_sort_container').filter({ hasText: "Name (Z to A)" })
            expect (opensortlisthightolow).toBeVisible
            await opensortlisthightolow.click()
            await opensortlisthightolow.selectOption(['hilo'])  
            const newusersortedinput = this.page.locator('.product_sort_container').filter({ hasText: "Price (high to low)" })
            await expect (newusersortedinput).toBeVisible()
            

            // Capture the elements (adjust the selector as needed)
            const priceElements = this.page.locator('.product[data-price]')

            // Extract price from elements
            const prices = await priceElements.allTextContents()

            // Convert prices to numbers
            const pricesAsNumbers = prices.map(price => parseFloat(price))

            // Check if prices are sorted in descending order
            const sortedPrices = [...pricesAsNumbers].sort((a, b) => b - a)
            let isSortedSecondScript: boolean = JSON.stringify(pricesAsNumbers) === JSON.stringify(sortedPrices);
            expect(isSortedSecondScript, 'Products are sorted in Z to A order').toBe(true)
            console.log('Products are sorted from high to low price');

        } catch (error) {
            console.error('An error occurred:', error);
            await this.page.screenshot({ path: 'src/screenshots' })

        }

    }


}


