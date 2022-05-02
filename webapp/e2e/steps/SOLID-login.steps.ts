import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import { close, getPage, login, setUp } from '../refactor';

const feature = loadFeature('./e2e/features/SOLID-login.feature');

let page: puppeteer.Page;

defineFeature(feature, test => {

    jest.setTimeout(30000);

    beforeAll(async () => {
        await setUp("https://www.dedeen1b.tk/" + "login");
        page = await getPage();
    });

    test('The user is not registered in the site', ({ given, when, then }) => {

        given('An unregistered user', () => {
            console.log("Test starting...");
        });

        when('They press the profile button and log in with their preferred SOLID provider', async () => {
            await page.setCacheEnabled(false);
            await new Promise(r => setTimeout(r, 2000));

            await login();
        });

        then('Their name should be shown', async () => {
            await expect(page).toMatch('dedeen1btests');
        });
    });

    test('The user is registered in the site', ({ given, when, then }) => {

        given('A registered user', () => {
            console.log("Test starting...");
        });

        when('They press the profile button and log in with their preferred SOLID provider', async () => {
            await page.setCacheEnabled(false);
            page.goto("https://www.dedeen1b.tk");
            await new Promise(r => setTimeout(r, 2000));
            await expect(page).toClick('path[d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"]');
            await new Promise(r => setTimeout(r, 1000));
        });

        then('Their name and orders, if any, should be shown', async () => {
            await new Promise(r => setTimeout(r, 10000));
            await expect(page).toMatch('dedeen1btests');
            await expect(page).toMatch('Order 2022-04-29');
        });
    });

    afterAll(async () => {
        close();
    })

});

