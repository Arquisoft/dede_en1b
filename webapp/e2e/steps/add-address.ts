import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/add-address.feature');

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

    test('Adding an address', ({ given, when, then }) => {
        let username: string;
        let password: string;

        given('A loged in user', () => {
            username = "dedeen1btests";
            password = "DeDe_En1B_Tests";
        });

        when('They change their address in their profile', async () => {
            //Login
            await page.setCacheEnabled(false);
            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick("#loginButton");
            await new Promise(r => setTimeout(r, 3000));
            // await page.screenshot({ path: './e2e/screenshots/wtf.png' });
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

            //Add address
            await page.goto(url + "profile");
            await new Promise(r => setTimeout(r, 2000));


            await expect(page).toFill('#Street', "X");
            await expect(page).toFill('#City', "X");
            await expect(page).toFill('#Locality', "X");
            await expect(page).toFill('#ZIPCode', "X");
            await expect(page).toFill('#Country', "X");

            await expect(page).toClick('#addAddress');
            await new Promise(r => setTimeout(r, 8000));
        });

        then('It appears on the shipping page', async () => {
            await page.goto(url + "shipping");
            await new Promise(r => setTimeout(r, 1000));
            await expect(page).toClick('input[autocapitalize="none"]');
            // await page.screenshot({ path: './e2e/screenshots/address.png' });
            await expect(page).toMatch("X, X, X, X");

        });
    });

    afterAll(async () => {
        browser.close()
    })

});

