import Page from './page'

var socialmediabutton;
var usernameInput;
var passwordInput;
var loginButton;

class LoginPageSocialMedia extends Page {

    /**
    * define elements specifically on gastro page
    */

    get loginButtonCollapsed()     { return browser.element('//*[@class="dropdown-toggle navbar-nav ml-auto"]'); }
    get loginButtonUncollapsed()     { return browser.element('div.dropdown-menu > button:nth-child(2)'); }    
    get gastroLogo()     { return browser.element('div.navbar-menu-divider:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)'); }
    get usernameloggedin()     { return browser.element('div.global-header > div.mx-auto > nav.navbar > button.dropdown-toggle > span:nth-child(1)'); }
    
    /**
     * define or overwrite page methods
     */
    open () {
        super.open('http://dev.gastro.org');
        browser.windowHandleMaximize();    
    }
    /**
     * your page specific methods
     */

    waitForloginPageToLoad () {
      if(!this.gastroLogo.isVisible()){
        this.gastroLogo.waitForVisible(5000);
      }
    }

    login (socialmedia, username, password) {
      this.waitForloginPageToLoad();
        //browser.debug();
        this.loginButtonCollapsed.click();
        this.loginButtonUncollapsed.click();
        browser.pause(3000);
        if (socialmedia == "facebook") 
        {
          this.facebookLoginProcess(username, password);
        }
        else if (socialmedia == "linkedin")
        {
          this.linkedinLoginProcess(username, password);
        }
        else
        {
          this.googleLoginProcess(username, password);
        }
        
        browser.pause(4000);
    }

    facebookLoginProcess(username, password)
    {
      //console.log("Entro a facebook");
      socialmediabutton = browser.element('button.auth0-lock-social-button:nth-child(1)');
      socialmediabutton.click();

      usernameInput = browser.element('//*[@id="email"]');
      passwordInput = browser.element('//*[@id="pass"]');
      loginButton = browser.element('//*[@id="loginbutton"]');

      usernameInput.setValue(username);
      passwordInput.setValue(password);
      loginButton.click();  
    }

    linkedinLoginProcess(username, password)
    {
      socialmediabutton = browser.element('button.auth0-lock-social-button:nth-child(3)');
      socialmediabutton.click();
      
      usernameInput = browser.element('//*[@id="session_key-login"]');
      passwordInput = browser.element('//*[@id="session_password-login"]');
      loginButton = browser.element('//*[@class="btn-signin"]');

      usernameInput.setValue(username);
      passwordInput.setValue(password);
      loginButton.click();  
    }

    googleLoginProcess(username, password)
    {
     
      socialmediabutton = browser.element('button.auth0-lock-social-button:nth-child(2)');
      socialmediabutton.click();

      usernameInput = browser.element('//*[@id="identifierId"]');
      loginButton = browser.element('//*[@class="CwaK9"]');

      usernameInput.setValue(username);
      loginButton.click();

      browser.pause(2000);
      passwordInput = browser.element('//*[@class="whsOnd zHQkBf"]');
      passwordInput.setValue(password);
      browser.pause(2000);
      loginButton.click();
    }

    getUserInfo (){
      //browser.debug();
      browser.pause(4000);
      var userloggedin = this.usernameloggedin.getText();
      this.logout();
      return userloggedin; 
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

export default new LoginPageSocialMedia()
