var LogInPage = function () {

  var loginBtn = element(by.id("btn-login"));
  var profiles = element.all(by.className("img-circle"));
  var logOutbtn = element(by.id("logout"));
  var name = element(by.id("usernamefield"));
  var filtered_names = element.all(by.css("body > app > div > login > div > div > div:nth-child(2) > div")).get(0);
  var selectedName;
  var loggedUserMenu = element(by.id("loggedUser"));

  var someProfile = element.all(by.className("img-circle")).get(0);
  var deleteBtn = element(by.id("deleteBtn"));
  var yesBtn = element(by.id("yesBtn"));
  var noBtn = element(by.id("noBtn"));
  var modal = element(by.id("myModal"));
  var alertmessage = element(by.id("messagelabel"));

  this.get = function (value) {
    browser.get(value);
  };

  this.logIn = () => {
    profiles.count().then(function (counted) {
      var profileNumber = parseInt(counted);
      var randomNo = Math.floor(Math.random() * (profileNumber - 1));
      var profileNames = element.all(by.className("text-overflow")).get(randomNo);
      profileNames.getAttribute("innerHTML").then(function (text) {
        selectedName = text;
        profiles.get(randomNo).click();
        loginBtn.click();
      });
    });
  };

  this.logOut = () => {
    loggedUserMenu.click();
    logOutbtn.click();
  };

  this.getCurrentURL = () => {
    return browser.getCurrentUrl();
  };

  this.filterUsername = () => {
    name.sendKeys("A");
    name.sendKeys("l");
    name.sendKeys("e");
    name.sendKeys("k");
    name.sendKeys("s");
  };

  this.filterUsernameJosif = () => {
    name.sendKeys("J");
    name.sendKeys("o");
    name.sendKeys("s");
    name.sendKeys("i");
    name.sendKeys("f");
  };

  this.filterUsernameЈосиф = () => {
    name.sendKeys("Ј");
    name.sendKeys("о");
    name.sendKeys("с");
    name.sendKeys("и");
    name.sendKeys("ф");
  };

  this.filterUsernameEma = () => {
    name.sendKeys("E");
    name.sendKeys("m");
    name.sendKeys("a");
  };

  this.filterUsernameClear = function (filter) {
    name.clear();
  }

  this.getTextFromFilter = () => {
    return filtered_names.getText();
  }

  this.signBtnIsVisible = () => {
    return loginBtn.isPresent();
  }

  this.getLoggedUser = () => {
    return loggedUserMenu.getText();
  };

  this.getSelectedUser = () => {
    return selectedName;
  };


  this.deleteProfile = () => {
    someProfile.click();
    deleteBtn.click();
    browser.wait(EC.visibilityOf(modal), 5000);
    yesBtn.click();
  };

  this.deleteFilteredUser = () => {
    someProfile.click();
    deleteBtn.click();
    browser.wait(EC.visibilityOf(modal), 5000);
    yesBtn.click();
  };

  this.deleteBtnIsVisible = () => {
    return deleteBtn.isPresent();
  };

  this.cancelDelete = () => {
    someProfile.click();
    deleteBtn.click();
    browser.wait(EC.visibilityOf(modal), 5000);
    noBtn.click();
  };

  this.isDeleteBtnIsVisible = () => {
    return deleteBtn.isPresent();
  };

  this.returnMessage = () => {
    return alertmessage.getText();
  };
};

module.exports = new LogInPage();
