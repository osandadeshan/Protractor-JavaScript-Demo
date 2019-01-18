# Protractor JavaScript Demo

<br />

## What is Protractor?

Protractor plays an important role in the Testing of AngularJS applications and works as a Solution integrator combining powerful technologies like Selenium, Jasmine, Web driver, etc. 

It is intended not only to test AngularJS application but also for writing automated regression tests for normal Web Applications as well.

<br />

## Why do we need Protractor framework?

JavaScript is used in almost all web applications. As the applications grow, JavaScript also increases in size and complexity. In such case, it becomes a difficult task for Testers to test the web application for various scenarios.

Sometimes it is difficult to capture the web elements in AngularJS applications using JUnit or Selenium WebDriver.
Protractor is a NodeJS program which is written in JavaScript and runs with Node to identify the web elements in AngularJS applications, and it also uses WebDriver to control the browser with user actions.

<br />

## Why can't we find Angular JS web elements using normal Selenium web driver?

Angular JS applications have some extra HTML attributes like ng-repeater, ng-controller, ng-model.., etc. which are not included in Selenium locators. Selenium is not able to identify those web elements using Selenium code. So, Protractor on the top of Selenium can handle and controls those attributes in Web Applications.

The protractor is an end to end testing framework for Angular JS based applications. While most frameworks focus on conducting unit tests for Angular JS applications, Protractor focuses on testing the actual functionality of an application.

<br />

## Protractor installation

(Steps 3 and 4 are Optional but recommended for better practice)

   1. Open command prompt and type `npm install –g protractor` and hit Enter.
      The above command will download the necessary files and install Protractor on the client system.

   2. Check the installation and version using `Protractor --version`. If successful it will show the version.

   3. Update the Web driver manager. The web driver manager is used for running the tests against the angular web application in a specific browser. After Protractor is installed, the web driver manager needs to be updated to the latest version. This can be done by running the following command in the command prompt.\
      `webdriver-manager update`

   4. Start the web driver manager. This step will run the web driver manager in the background and will listen to any tests which run via protractor.
   Once Protractor is used to run any test, the web driver will automatically load and run the test in the relevant browser. To start  the web driver manager, the following command needs to be executed from the command prompt.\
   `webdriver-manager start`

   Now, if you go to the following URL (http://localhost:4444/wd/hub/static/resource/hub.html) in your browser, you will actually see the Web driver manager running in the background.

<br />

## How to run this project?

   1. Clone this project
   2. Run `npm install` to download required dependencies
   3. Run `protractor conf.js` to run the sample tests
   4. Reports will be created in *./reports* folder
