"use strict";

const Helper = require("protractor-helper");
const LoginPage = require("../../page/using_helper_class/LoginPagePo.js");


describe("'Login to the application' form", () => {

  const userData = {
    userName: "gem",
    password: "gem"
  };

  beforeEach(() => {
    browser.driver.manage().deleteAllCookies();
    LoginPage.visit();
  });

  it("Submit without username and password inputs", () => {
    Helper.clickWhenClickable(LoginPage.signInButton);
    Helper.waitForElementVisibility(LoginPage.userNameInput);
    Helper.waitForElementVisibility(LoginPage.passwordInput);
    Helper.waitForElementVisibility(LoginPage.signInButton);
  });

  it("Submit with only valid username", () => {
    LoginPage.login(userData.userName, "");
    Helper.waitForElementVisibility(LoginPage.userNameInput);
    Helper.waitForElementVisibility(LoginPage.passwordInput);
    Helper.waitForElementVisibility(LoginPage.signInButton);
  });

  it("Submit valid username and valid password", () => {
    LoginPage.login(userData.userName, userData.password);
  });


});
