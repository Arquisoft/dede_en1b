import puppeteer from "puppeteer";

let page: puppeteer.Page;
let browser: puppeteer.Browser;

export async function login() {
    jest.setTimeout(60000);

    let u: string;
    let p: string;
    u = "dedeen1btests";
    p = "DeDe_En1B_Tests";

    await page.setCacheEnabled(false);
    await new Promise(r => setTimeout(r, 1000));
    await expect(page).toClick("#loginButton");
    await new Promise(r => setTimeout(r, 10000));
    await expect(page).toFillForm('form[name="cognitoSignInForm"]', {
        username: u,
        password: p,
    });
    await expect(page).toClick('input[name="signInSubmitButton"]');
    await new Promise(r => setTimeout(r, 2000));
    await expect(page).toClick("button.allow-button");
    await new Promise(r => setTimeout(r, 5000));
}

export async function addToCart(url: string) {
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
    return page;
}

export async function loginAndAddToCart(url: string) {
    await page.setCacheEnabled(false);

    //Login
    await login();

    //Add to cart
    await addToCart(url);
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
export async function quickLogin() {
    let u: string;
    let p: string;
    u = "dedeen1btests";
    p = "DeDe_En1B_Tests";

    await expect(page).toFillForm('form[name="cognitoSignInForm"]', {
        username: u,
        password: p,
    });
    await expect(page).toClick('input[name="signInSubmitButton"]');
    await new Promise(r => setTimeout(r, 2000));
    await expect(page).toClick("button.allow-button");
    await new Promise(r => setTimeout(r, 5000));
}