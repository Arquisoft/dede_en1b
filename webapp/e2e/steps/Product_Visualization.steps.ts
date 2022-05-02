import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/Product_Visualization.feature');

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
            .catch((error) => { console.log(error); });
    });

    test('Main Products view', ({ given, when, then }) => {

        given('An user', () => { });

        when('They enter the application', async () => {
            await new Promise(r => setTimeout(r, 2000));            
        });

        then('Several Prodcut cards must be shown', async () => {
            await expect(page).toMatch('Nissan 300ZX');
            await expect(page).toMatch('Toyota 2000GT');
            await expect(page).toMatch('Plymouth Barracuda');
        });
    });

    test('Product detail view', ({ given, when, then }) => {

        given('An user', () => { });

        when('They enter the application and click on a product card', async () => {
            await new Promise(r => setTimeout(r, 2000));            
            await expect(page).toClick("div.product-card");
        });

        then('The details view of the selected product must be shown', async () => {
            await new Promise(r => setTimeout(r, 2000));            
            await expect(page).toMatch('Nissan 300ZX');
            await expect(page).toMatch('Widebody. Banana Split Yellow. A beast.');
        });
    })

    afterAll(async () => {
        browser.close()
    })

});

