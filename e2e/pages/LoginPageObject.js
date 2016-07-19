var LogInPage = function () {

  var loginBtn = element(by.id("btn-login"));
  var logOutbtn = element(by.id("logout"));
  var createBtn = element(by.id("createUser"));
  var yesBtn = element(by.id("yesBtn"));
  var noBtn = element(by.id("noBtn"));
  var deleteBtn = element(by.id("deleteBtn"));
  var modal = element(by.id("myModal"));
  var alertMessage = element(by.id("messagelabel"));
  var profiles = element.all(by.className("img-circle"));
  var firstProfile = profiles.get(0);
  var usernameField = element(by.id("usernamefield"));
  var loggedUserMenu = element(by.id("loggedUser"));
  var englishLanguage = element(by.id("en"));
  var appName = element(by.className("navbar-brand"));

  this.logIn = () => {
    profiles.get(0).click();
    loginBtn.click();
  };

  this.logOut = () => {
    loggedUserMenu.click();
    logOutbtn.click();
  };

  this.filterUsername = () => {
    browser.wait(EC.visibilityOf(usernameField), 2000);
    usernameField.sendKeys("A");
    usernameField.sendKeys("l");
    usernameField.sendKeys("e");
    usernameField.sendKeys("k");
    usernameField.sendKeys("s");
  };

  this.filterUsernameJosif = () => {
    browser.wait(EC.visibilityOf(usernameField), 2000);
    usernameField.sendKeys("J");
    usernameField.sendKeys("o");
    usernameField.sendKeys("s");
    usernameField.sendKeys("i");
    usernameField.sendKeys("f");
  };

  this.filterUsernameЈосиф = () => {
    browser.wait(EC.visibilityOf(usernameField), 2000);
    usernameField.sendKeys("Ј");
    usernameField.sendKeys("о");
    usernameField.sendKeys("с");
    usernameField.sendKeys("и");
    usernameField.sendKeys("ф");
  };

  this.clearFilterUsernameField = (filter) => {
    usernameField.clear();
  }

  this.getFirstFilteredUsername = () => {
    var firstFilteredUsername = element.all(by.className("text-overflow")).get(0);
    return firstFilteredUsername.getAttribute("innerHTML");
  }

  this.isLoginBtnVisible = () => {
    return loginBtn.isPresent();
  }

  this.getLoggedUser = () => {
    return loggedUserMenu.getText();
  };

  this.deleteFirstProfile = () => {
    firstProfile.click();
    deleteBtn.click();
    browser.wait(EC.visibilityOf(modal), 5000);
    yesBtn.click();
  };

  this.isDeleteBtnVisible = () => {
    return deleteBtn.isPresent();
  };

  this.cancelDelete = () => {
    firstProfile.click();
    deleteBtn.click();
    browser.wait(EC.visibilityOf(modal), 5000);
    noBtn.click();
  };

  this.returnAlertMessage = () => {
    return alertMessage.getText();
  };

  this.clickCreateBtn = () => {
    createBtn.click();
  };

  this.waitForCreateBtn = () => {
    browser.wait(EC.visibilityOf(createBtn), 5000);
  };

  this.chooseEnglishLanguage = () => {
    englishLanguage.click();
  }

  this.getAppName = () => {
    return appName.getAttribute("innerHTML");
  }
};

module.exports = new LogInPage();
