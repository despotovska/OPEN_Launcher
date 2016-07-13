var UserSettingsEditPage = function () {

  var userSettings = element(by.id("userSettingsEdit"));

  var whiteColor = element(by.id("pointer-color-0"));
  var yellowColor = element(by.id("pointer-color-1"));
  var colorRedSelected = element(by.className("pointer-color-4 color-box img-circle selected"));

  var smallPointer = element(by.id("pointer-size-0"));
  var mediumPointer = element(by.id("pointer-size-1"));

  var bgColors = element.all(by.name('bgColorOption'));

  var mouseRadioBtn = element(by.id("device-type-0"));
  var touchscreenRadioBtn = element(by.id("device-type-1"));
  var trackballRadioBtn = element(by.id("device-type-2"));

  var someProfile = element.all(by.className("img-circle")).get(0);
  var loginBtn = element(by.id("btn-login"));
  var saveSettingsBtn = element(by.id("saveUserSettings"));

  this.get = function (value) {
    browser.get(value);
  };

  this.navigateToEditUserSettingsPage = () => {
    userSettings.click();
  }

  this.isRedColorSelected = () => {
    return colorRedSelected.isPresent();
  };

  this.isYellowColorSelected = () => {
    return yellowColor.isPresent();
  };

  this.isWhiteColorSelected = () => {
    return whiteColor.isPresent();
  };

  this.isMediumPointerSelected = () => {
    return mediumPointer.isPresent();
  };

  this.isSmallPointerSelected = () => {
    return smallPointer.isPresent();
  };

  this.isMouseSelected = () => {
    return mouseRadioBtn.getAttribute().isSelected();
  };

  this.isTrackballSelected = () => {
    return trackballRadioBtn.getAttribute().isSelected();
  };

  this.isTouchScreenSelected = () => {
    return touchscreenRadioBtn.getAttribute().isSelected();
  };

  this.logInFilteredUser = () => {
    someProfile.click();
    loginBtn.click();
  };

  this.userSettingsSave = () => {
    saveSettingsBtn.click();
  };

  this.isColorThemeSelected = () => {
    return bgColors.get(0).getAttribute().isSelected();
  };

  this.isBWThemeSelected = () => {
    return bgColors.get(1).getAttribute().isSelected();
  };
};

module.exports = new UserSettingsEditPage();
