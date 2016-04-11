var UserSettingsEditPage = function() {



  var userSettings = element(by.id("userSettingsEdit"));
  var yellowColor = element(by.className("pointer-color-1 color-box img-circle selected"));
  var whiteColor = element(by.className("pointer-color-0 color-box img-circle selected"));
  var smallPointer = element(by.className("img-circle selected"));
  var mediumPointer = element(by.className("img-circle selected"));
  var colorRedSelected = element(by.className("pointer-color-4 color-box img-circle selected"));
  var radioBtn = element.all(by.css('input[type="radio"]'));
  var someProfile = element.all(by.className("img-circle")).get(0);
  var signBtn = element(by.id("btn-login"));
  var saveSettings = element(by.id("saveUserSettings"));
  var loggedUser = element(by.id("loggedUser"));

  this.get = function(value) {
    browser.get(value);
  };

  this.openUserSettings = function() {
    userSettings.click();
  }

  this.isRedColorSelected = function() {
    return colorRedSelected.isPresent();
  };

  this.isYellowColorSelected = function() {
    return yellowColor.isPresent();
  };

  this.isWhiteColorSelected = function() {
    return whiteColor.isPresent();
  };

  this.isMediumPointerSelected = function() {
    return mediumPointer.isPresent();
  };

  this.isSmallPointerSelected = function() {
    return smallPointer.isPresent();
  };

  this.logInFilteredUser = function() {
    someProfile.click();
    signBtn.click();
  };

  this.userSettingsSave = function() {
    saveSettings.click();
  };

  this.isColorThemeSelected = function() {
    return radioBtn.get(0).getAttribute().isSelected();
  };

  this.isBWThemeSelected = function() {
    return radioBtn.get(1).getAttribute().isSelected();
  };

};

module.exports = new UserSettingsEditPage();
