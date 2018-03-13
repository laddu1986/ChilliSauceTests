
import { defineSupportCode } from 'cucumber';
import LoginPageSocialMedia from '../pageobjects/loginSocialMedia.page';

defineSupportCode(function({ Given, When, Then}) {

  //
  Given(/^I am on the Gastro.org page$/, function() {
    LoginPageSocialMedia.open();     // navigating to login page
  });

 //
  When(/^a "([^"]*)" user enters his email and password "([^"]*)" "([^"]*)" into the fields$/, function(socialmedia, email, pass) {
    LoginPageSocialMedia.login(socialmedia, email, pass);    // entering user name, password and and submiting the page
  });

  //
  Then(/^user sees his username "([^"]*)" at the top of the main page$/, function(username) {
    LoginPageSocialMedia.getUserInfo().should.equal(username);
  });

});
