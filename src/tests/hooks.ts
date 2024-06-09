import { Given, When, Then, After, Before, AfterAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page, test as base } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
export let page: Page;

async function setupBrowser() {
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome", args: ['--start-maximized'] });
    context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, javaScriptEnabled: true });
    page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
  } catch (error) {
    console.error(`Failed to launch the browser and navigate to the URL: ${error}`);
  }
}
Before(async () => {
  await setupBrowser();
});


// After hook: Close the page
After(async () => {
  await page.close();
});

// AfterAll hook: Close the browser
AfterAll(async () => {
  await browser.close();
});
