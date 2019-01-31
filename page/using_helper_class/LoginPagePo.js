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
    Helper.fillFieldWithTextWhenVisible(this.userNameInput, userName);
    Helper.fillFieldWithTextWhenVisible(this.passwordInput, password);
    Helper.clickWhenClickable(this.signInButton);
  }

  
}

module.exports = new LoginPage();
