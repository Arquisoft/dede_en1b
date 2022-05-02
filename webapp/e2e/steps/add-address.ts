import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import { addToCart, login } from '../refactor';

const feature = loadFeature('./e2e/features/add-address.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;
// let url = "https://www.dedeen1b.tk/"
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
            .catch((error) => { console.log(error); });
    });

    test('Adding an address', ({ given, when, then }) => {

        given('A loged in user', () => {
            console.log("Test starting...");
        });

        when('They change their address in their profile', async () => {
            await page.setCacheEnabled(false);

            //Login
            await login(page);

            //Add to cart
            await addToCart(page, url);

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
            await expect(page).toMatch("X, X, X, X");

        });
    });

    afterAll(async () => {
        browser.close()
    })

});

