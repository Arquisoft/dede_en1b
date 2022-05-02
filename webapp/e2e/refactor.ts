import puppeteer from "puppeteer";

export async function login(page: puppeteer.Page) {
    jest.setTimeout(30000);

    let username: string;
    let password: string;
    username = "dedeen1btests";
    password = "DeDe_En1B_Tests";

    await page.setCacheEnabled(false);
    await new Promise(r => setTimeout(r, 2000));
    await expect(page).toClick("#loginButton");
    await new Promise(r => setTimeout(r, 3000));
    await expect(page).toFillForm('form[name="cognitoSignInForm"]', {
        username: username,
        password: password,
    });
    await expect(page).toClick('input[name="signInSubmitButton"]');
    await new Promise(r => setTimeout(r, 2000));
    await expect(page).toClick("button.allow-button");
    await new Promise(r => setTimeout(r, 5000));
};