'use strict'


class GuruLoginPage {

  constructor() {
    this.userId = element(by.xpath("//input[@name='uid']"));
    this.password = element(by.xpath("//input[@name='password']"));
    this.loginBtn = element(by.xpath("//input[@name='btnLogin']"));
  }

  async visit() {
    await browser.get("http://demo.guru99.com/v4/");
  }

  async setUserId(name) {
    await this.userId.sendKeys(name);
  };
  
  async setPassword(pwd) {
    await this.password.sendKeys(pwd);
  };
  
  async clickOnLoginButton() {
    await this.loginBtn.click();
  };
  
  async login(username, password) {
    await this.setUserId(username);
    await this.setPassword(password);
    await this.clickOnLoginButton();
  };

  async getLoginPageTitle() {
    return await browser.getTitle();
  }


};

module.exports = new GuruLoginPage();