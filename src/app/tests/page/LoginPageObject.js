var LogInPage = function() {



  var signBtn = element(by.id("btn-login"));
  var profile = element.all(by.className("img-circle"));
  var logOutbtn = element(by.id("logout"));
  var name = element(by.id("usernamefield"));
  var filtered_names = element.all(by.css("body > app > div > login > div > div > div:nth-child(2) > div")).get(0);
  //var loggedUser = element(by.css("body > app > div > home > div > div > b"));
  var profileNumber;
  var randomNo;
  var profileNames;
  var selectedName;
  var loggedUsername;
  var loggedUserMenu = element(by.id("loggedUser"));


  this.get = function(value) {
    browser.get(value);
  };

  this.logIn = function() {
    profile.count().then(function(counted) {
      console.log(counted);
      profileNumber = parseInt(counted);
      console.log("Profilenumber: " + profileNumber);
      randomNo = Math.floor(Math.random() * (profileNumber - 1));
      profileNames = element.all(by.className("text-overflow")).get(randomNo);
      profileNames.getAttribute("innerHTML").then(function(text) {
        selectedName = text;
        console.log("Random number: " + randomNo);
        console.log("Selected user:" + selectedName);
        profile.get(randomNo).click();
        signBtn.click();
      });
    });

  };


  this.logOut = function() {
    loggedUserMenu.click();
    logOutbtn.click();
  };

  this.getCurrentURL = function() {
    return browser.getCurrentUrl();
  };

  this.filterUsername = function() {
    name.sendKeys("A");
    name.sendKeys("l");
    name.sendKeys("e");
    name.sendKeys("k");
    name.sendKeys("s");

  };

  this.filterUsernameJosif = function() {
    name.sendKeys("J");
    name.sendKeys("o");
    name.sendKeys("s");
    name.sendKeys("i");
    name.sendKeys("f");
  };

  this.filterUsernameClear = function(filter) {
    name.clear();

  }
  this.getTextFromFilter = function() {
    return filtered_names.getText();
  }

  this.signBtnIsVisible = function() {
    return signBtn.isPresent();
  }

  this.getLoggedUser = function() {
    loggedUserMenu.getText().then(function(text) {
      loggedUsername = text;
      console.log("User logged in: " + loggedUsername);
      return loggedUsername;
    });
  };

  this.getSelectedUser = function() {
    return selectedName;
  };

  this.getTitle = function() {
    return browser.getTitle();
  };



};

module.exports = new LogInPage();
