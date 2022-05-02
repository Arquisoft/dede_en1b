import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/add-to-cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

    jest.setTimeout(30000);

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        await page
            .goto("http://www.dedeen1b.tk/", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('Adding one item', ({ given, when, then }) => {;

        given('A user', () => {
        });

        when('They add an item to the cart and navigate to the cart', async () => {
            await expect(page).toClick('#addToCartButton');
            await new Promise(r => setTimeout(r, 2000));
        });

        then('They can see the item', async () => {
            await page.goto("http://www.dedeen1b.tk/cart");
            await expect(page).toMatch('Nissan 300ZX');
        });
    });

    afterAll(async () => {
        browser.close()
    })

    test('Adding an item from product details view', ({ given, when, then }) => {;

        given('A user', () => {
        });

        when('They add an item to the cart from the details view of the product and navigate to the cart', async () => {
            await page.goto("http://www.dedeen1b.tk/products/6247415969857467dbbd7a1e");
            await new Promise(r => setTimeout(r, 1000));
            await expect(page).toClick('#addToCartButton');
            await new Promise(r => setTimeout(r, 2000));
            // await page.screenshot({ path: './e2e/screenshots/cart.png' });
        });

        then('They can see the item', async () => {
            await page.goto("http://www.dedeen1b.tk/cart");
            await expect(page).toMatch('Nissan 300ZX');
        });
    });

    afterAll(async () => {
        browser.close()
    })

});

