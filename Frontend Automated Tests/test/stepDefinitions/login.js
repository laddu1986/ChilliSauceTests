
import { defineSupportCode } from 'cucumber';
import loginPage from '../pageobjects/login.page';
import LoginPageSocialMedia from '../pageobjects/loginSocialMedia.page';

defineSupportCode(function({ Given, When, Then}) {

  //Open the site on the browser
  Given(/^I am on the Gastro.org page$/, function() {
    loginPage.open();     // navigating to login page
  });

 //Successful Login with email account
  When(/^an "([^"]*)" user enters his email and password "([^"]*)" "([^"]*)" into the fields$/, function(arg1, arg2, arg3) {
    loginPage.login(arg2, arg3);    // entering user name, password and and submiting the page
  });

  //Successful Login with social media accounts
  When(/^a "([^"]*)" user enters his email and password "([^"]*)" "([^"]*)" into the fields$/, function(socialmedia, email, pass) {
    LoginPageSocialMedia.login(socialmedia, email, pass);    // entering user name, password and and submiting the page
  });

  //Unsuccessful Login with wrong credentials
  When(/^a user enters incorrectly his email-password "([^"]*)" "([^"]*)" into the fields$/, function(email, password) {
    loginPage.login(email, password);    // entering user name, password and and submiting the page
  });

  //Unsuccessful Login with no credentials
  When(/^a user leaves in blank the email-password fields$/, function() {
    loginPage.blankFields();    // entering user name, password and and submiting the page
  });

  //Getting username logged in
  Then(/^user sees his username "([^"]*)" at the top of the main page$/, function(username) {
    loginPage.getUserInfo().should.equal(username);
  });

  //Unsuccessful Login with wrong credentials
  Then(/^user sees an error message "([^"]*)"$/, function(message) {
    loginPage.getUnsuccessfulLoginMessage().should.equal(message);
  });

   //Unsuccessful Login with no credentials
  Then(/^user sees a warning message "([^"]*)"$/, function(message) {
    loginPage.getBlankLoginMessage().should.equal(message);
  });

});
