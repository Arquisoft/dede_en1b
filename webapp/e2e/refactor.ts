import puppeteer from "puppeteer";

let page: puppeteer.Page;
let browser: puppeteer.Browser;

export async function login(page: puppeteer.Page) {
    jest.setTimeout(30000);

    let username: string;
    let password: string;
    username = "dedeen1btests";
    password = "DeDe_En1B_Tests";

    await page.setCacheEnabled(false);
    await new Promise(r => setTimeout(r, 2000));
    await expect(page).toClick("#loginButton");
    await new Promise(r => setTimeout(r, 5000));
    await expect(page).toFillForm('form[name="cognitoSignInForm"]', {
        username: username,
        password: password,
    });
    await expect(page).toClick('input[name="signInSubmitButton"]');
    await new Promise(r => setTimeout(r, 2000));
    await expect(page).toClick("button.allow-button");
    await new Promise(r => setTimeout(r, 5000));
};

export async function addToCart(page: puppeteer.Page, url: string) {
    await page.goto(url);
    await new Promise(r => setTimeout(r, 3000));
    await expect(page).toClick('#addToCartButton');
    await new Promise(r => setTimeout(r, 2000));
}

export async function setUp(url: string) {
    jest.setTimeout(60000);


    browser = process.env.GITHUB_ACTIONS
        ? await puppeteer.launch()
        : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
        .goto(url, {
            waitUntil: "networkidle0",
        })
        .catch((error) => { console.log(error); });

    // await page.screenshot({ path: './e2e/buddy-screenshot.png' });
    return page;
}

export async function getPage() {
    return page;
}

export async function getBrowser() {
    return page;
}

export function close() {
    browser.close();
}