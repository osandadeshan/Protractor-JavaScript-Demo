'use strict'

const guruLoginPage = require('../../page/using_async_await/LoginPagePo.js');

const LOGIN_PAGE_TITLE = "Guru99 Bank Home Page"; 
const userId = "mngr176318";
const password = "vumejAn";

describe('Login to the application', function () {

    beforeEach((done) => {
      browser.driver.manage().deleteAllCookies();
      guruLoginPage.visit().then(done);
    });

    it("Login without username and password inputs", async function () {
        await guruLoginPage.login("", "");
        var alertDialog = await browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual("User or Password is not valid");
        await browser.switchTo().alert().accept();
        await expect(guruLoginPage.getLoginPageTitle()).toEqual(LOGIN_PAGE_TITLE);
    });

    it("Login with only valid username", async function () {
        await guruLoginPage.login(userId, "");
        await expect(guruLoginPage.getLoginPageTitle()).toEqual(LOGIN_PAGE_TITLE);
    });

    it('Submit valid username and expired password', async function () {
        await guruLoginPage.login(userId, password);
        var alertDialog = await browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual("User or Password is not valid");
        await browser.switchTo().alert().accept();
        await expect(guruLoginPage.getLoginPageTitle()).toEqual(LOGIN_PAGE_TITLE);
    });


});
