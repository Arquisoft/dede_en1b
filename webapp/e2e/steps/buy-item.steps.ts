import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/buy-item.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;
// let url = "http://www.dedeen1b.tk/"
let url = "http://localhost:3000/"


defineFeature(feature, test => {

    jest.setTimeout(60000);

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        await page
            .goto(url + "login", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('Buying a product', ({ given, when, then }) => {
        let username: string;
        let password: string;

        given('A user with an item in his cart', () => {
            username = "dedeen1btests";
            password = "DeDe_En1B_Tests";
        });

        when('They buy it', async () => {
            //Login
            await page.setCacheEnabled(false);
            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick("#loginButton");
            await new Promise(r => setTimeout(r, 5000));
            await expect(page).toFillForm('form[name="cognitoSignInForm"]', {
                username: username,
                password: password,
            })
            await expect(page).toClick('input[name="signInSubmitButton"]');
            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick("button.allow-button");
            await new Promise(r => setTimeout(r, 10000));

            //Add to cart
            await page.goto(url + "");
            await new Promise(r => setTimeout(r, 1000));
            await expect(page).toClick('#addToCartButton');
            await new Promise(r => setTimeout(r, 2000));
            await page.goto(url + "shipping");

            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick("#loginButton");
        });

        then('The order appears in their profile', async () => {
            await new Promise(r => setTimeout(r, 5000));
            // await page.screenshot({ path: './e2e/screenshots/buy.png' });
            await expect(page).toMatch("Total: 49.99 €");

        });
    });

    afterAll(async () => {
        browser.close()
    })

});

