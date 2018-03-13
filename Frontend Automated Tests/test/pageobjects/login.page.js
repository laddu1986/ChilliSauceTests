import Page from './page'

class LoginPage extends Page {

    /**
    * define elemenst
    */

    get usernameInput()   { return browser.element('//*[@name="email"]'); }
    get passwordInput()   { return browser.element('//*[@name="password"]'); }
    get loginButtonCollapsed()     { return browser.element('//*[@class="dropdown-toggle navbar-nav ml-auto"]'); }
    get loginButtonUncollapsed()     { return browser.element('div.dropdown-menu > button:nth-child(2)'); }
    get loginButton()     { return browser.element('button.auth0-lock-submit'); }
    get gastroLogo()     { return browser.element('div.navbar-menu-divider:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)'); }
    get usernameloggedin()     { return browser.element('div.global-header > div.mx-auto > nav.navbar > button.dropdown-toggle > span:nth-child(1)'); }
    get unsucessfulLoginMsg()     { return browser.element('div.auth0-global-message > span:nth-child(1)'); }
    get blankLoginMsg()     { return browser.element('div.auth0-lock-error-msg > span:nth-child(1)'); }
    

    
    /**
     * define or overwrite page methods
     */
    open () {
        //super.open('http:dev.gastro.org');
        browser.url(browser.options.baseUrl);
        browser.windowHandleMaximize();    
    }
    /**
     * your page specific methods
     */

    waitForloginPageToLoad () {
      if(!this.gastroLogo.isVisible()){
        this.gastroLogo.waitForVisible(10000);
      }
    }

    login (username, password) {
      this.waitForloginPageToLoad();
        //browser.debug();
        this.loginButtonCollapsed.click();
        this.loginButtonUncollapsed.click();
        browser.pause(3000);
        this.usernameInput.setValue(username);
        this.passwordInput.setValue(password);
        this.loginButton.click();
        browser.pause(5000);
    }

    blankFields () {
      this.waitForloginPageToLoad();
        //browser.debug();
        this.loginButtonCollapsed.click();
        this.loginButtonUncollapsed.click();
        browser.pause(3000);
        /*this.usernameInput.setValue('');
        this.passwordInput.setValue('');*/
        this.loginButton.click();
        browser.pause(3000);
    }

    getUserInfo (){
      //browser.debug();
      browser.pause(4000);
      var userloggedin = this.usernameloggedin.getText();
      this.logout();
      return userloggedin; 
    }

    getUnsuccessfulLoginMessage (){
      //browser.debug();
      //browser.pause(4000);
      this.unsucessfulLoginMsg.waitForVisible(10000);
      var message = this.unsucessfulLoginMsg.getText();
      message = message.toLowerCase();
      return message;
    }

    getBlankLoginMessage (){
      //browser.debug();
      //browser.pause(4000);
      this.blankLoginMsg.waitForVisible(5000);
      var message = this.blankLoginMsg.getText();
      message = message.toLowerCase();
      return message;
    }

    logout ()
    {
      //browser.debug();
      var logoutButton = browser.element('div.dropdown-menu > button:nth-child(1)'); 
      this.loginButtonCollapsed.click();
      browser.pause(3000);
      logoutButton.click();
      browser.pause(3000);
    }
}

export default new LoginPage()
