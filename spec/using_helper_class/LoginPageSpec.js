"use strict";

const helper = require("protractor-helper");
const loginPage = require("../../page/using_helper_class/LoginPagePo.js");

const LOGIN_PAGE_TITLE = "Sign-on: Mercury Tours";
const FLIGHT_FINDER_PAGE_TITLE = "Find a Flight: Mercury Tours:";  


describe("'Login to the application' form", () => {

  const userData = {
    userName: "gem",
    password: "gem"
  };

  beforeEach(() => {
    browser.driver.manage().deleteAllCookies();
    loginPage.visit();
  });

  it("Submit without username and password inputs", () => {
    helper.click(loginPage.signInButton);
    helper.waitForElementVisibility(loginPage.userNameInput);
    helper.waitForElementVisibility(loginPage.passwordInput);
    helper.waitForElementVisibility(loginPage.signInButton);
    expect(loginPage.getPageTitle()).toEqual(LOGIN_PAGE_TITLE);
  });

  it("Submit with only valid username", () => {
    loginPage.login(userData.userName, "");
    helper.waitForElementVisibility(loginPage.userNameInput);
    helper.waitForElementVisibility(loginPage.passwordInput);
    helper.waitForElementVisibility(loginPage.signInButton);
    expect(loginPage.getPageTitle()).toEqual(LOGIN_PAGE_TITLE);
  });

  it("Submit valid username and valid password", () => {
    loginPage.login(userData.userName, userData.password);
    expect(loginPage.getPageTitle()).toEqual(FLIGHT_FINDER_PAGE_TITLE);
  });


});
