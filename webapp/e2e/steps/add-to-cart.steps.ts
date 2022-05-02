import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import { addToCart, close, getPage, setUp } from '../refactor';

const feature = loadFeature('./e2e/features/add-to-cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

    jest.setTimeout(30000);

    beforeAll(async () => {
        await setUp("http://www.dedeen1b.tk/");
        page = await getPage();
    });

    test('Adding one item', ({ given, when, then }) => {
        ;

        given('A user', () => {
            console.log("Test starting...");
        });

        when('They add an item to the cart and navigate to the cart', async () => {
            await addToCart(page, "http://www.dedeen1b.tk/");
        });

        then('They can see the item', async () => {
            await check();
        });
    });

    test('Adding an item from product details view', ({ given, when, then }) => {
        ;

        given('A user', () => {
            console.log("Test starting...");
        });

        when('They add an item to the cart from the details view of the product and navigate to the cart', async () => {
            await addToCart(page, "http://www.dedeen1b.tk/products/6247415969857467dbbd7a1e");
        });

        then('They can see the item', async () => {
            await check();
        });
    });

    afterAll(async () => {
        close();
    })

});

async function check() {
    await page.goto("http://www.dedeen1b.tk/cart");
    await expect(page).toMatch('Nissan 300ZX');
}

