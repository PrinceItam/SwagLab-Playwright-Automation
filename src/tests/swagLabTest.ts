import { Given, When, Then, defineStep, setDefaultTimeout } from "@cucumber/cucumber"
import { Page } from "@playwright/test"
import { page } from "../tests/hooks"
import { LoginPage } from "../pageObjects/loginPage"
import { ProductPage } from "../pageObjects/productsPage"
import { InvalidLoginPage } from "../pageObjects/lockedOutUserLogic"

//setDefaultTimeout(1000 * 60 * 20);  // For debugging use only

Given('standard customer is logged in', async function (this: { page: Page }) {

  const username = 'standard_user'
  const password = 'secret_sauce'
  const loginPage = new LoginPage(page)
  await loginPage.standardCustomerLogin(username, password)

});


When('the customer adds multiple products to the shopping cart', async function () {

  const productsPage = new ProductPage(page)
  await productsPage.verifyCheckoutPage()
  await productsPage.verifyCheckoutPage2()

});

When('proceeds to checkout the purchase', async function () {

  const productsPage = new ProductPage(page)
  await productsPage.checkout()

})

Then('purchase is successful', async function () {

  const productsPage = new ProductPage(page)

  await productsPage.customerfirstname()
  await productsPage.customerlastname()
  await productsPage.postalcode()
  await productsPage.assertBagProductisaddedtocart()
  await productsPage.assertBikelightProductisaddedtocart()
  await productsPage.completVerifiedPurchase()

})


defineStep('standard customer is login', async function (this: { page: Page }) {
  const username = 'standard_user'
  const password = 'secret_sauce'
  const loginPage = new LoginPage(page)

  await loginPage.standardCustomerLogin(username, password);

})

When('the customer sorts available products in product view', async function () {
  const productsPage = new ProductPage(page)
  await productsPage.sortproductspage()

})

Then('the products are ordered according to the chosen sort method', async function () {
  const productsPage = new ProductPage(page)
  await productsPage.verifyProductSortingByUser()

})

Given('customer is a locked out customer', async function () {
  const invalidLoginPage = new InvalidLoginPage(page)
  await invalidLoginPage.lockedOutUser()

})

When('the customer attempts to login using proper credentials', async function () {
  const invalidLoginPage = new InvalidLoginPage(page)
  await invalidLoginPage.loginwithInvalidCredentials()

})

When('login fails', async function () {
  const invalidLoginPage = new InvalidLoginPage(page)
  await invalidLoginPage.loginError()

})

Then('the customer is presented with error state', async function () {
  const invalidLoginPage = new InvalidLoginPage(page)
  await invalidLoginPage.errorstate()

})

