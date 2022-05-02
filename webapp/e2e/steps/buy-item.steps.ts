import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import { addToCart, login, close, getPage, setUp } from '../refactor';

const feature = loadFeature('./e2e/features/buy-item.feature');

let page: puppeteer.Page;
// let url = "https://www.dedeen1b.tk/"
let url = "http://localhost:3000/"


defineFeature(feature, test => {

    jest.setTimeout(60000);

    beforeAll(async () => {
        await setUp(url + "login");
        page = await getPage();
    });

    test('Buying a product', ({ given, when, then }) => {

        given('A user with an item in his cart', () => {
            console.log("Test starting...");
        });

        when('They buy it', async () => {
            await page.setCacheEnabled(false);

            //Login
            await login();

            //Add to cart
            addToCart(url);

            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick("#loginButton");
        });

        then('The order appears in their profile', async () => {
            await new Promise(r => setTimeout(r, 5000));
            await expect(page).toMatch("Total: 49.99 €");

        });
    });

    afterAll(async () => {
        close();
    })

});

