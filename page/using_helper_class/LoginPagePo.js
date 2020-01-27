"use strict";

const Helper = require("protractor-helper");


class LoginPage {

  constructor() {
    this.userNameInput = element(by.name("userName"));
    this.passwordInput = element(by.name("password"));
    this.signInButton = element(by.name("login"));
  }

  visit() {
    browser.get("http://newtours.demoaut.com/mercurysignon.php");
  }

  login(userName, password) {
    Helper.fillFieldWithText(this.userNameInput, userName);
    Helper.fillFieldWithText(this.passwordInput, password);
    Helper.click(this.signInButton);
  }

  getPageTitle() {
    return browser.getTitle();
  }

  
}

module.exports = new LoginPage();
