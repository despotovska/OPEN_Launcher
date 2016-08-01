var UserSettingsEditPage = function () {

  var userSettingsMenuItem = element(by.id("userSettingsEdit"));
  var saveSettingsBtn = element(by.id("saveUserSettings"));
  var whiteColor = element(by.className("pointer-color-0 selected"));
  var yellowColor = element(by.className("pointer-color-1 selected"));
  var greenColor = element(by.className("pointer-color-2 selected"));
  var blueColor = element(by.className("pointer-color-3 selected"));
  var redColor = element(by.className("pointer-color-4 selected"));
  var smallPointer = element(by.className("pointer-size-0 selected"));
  var mediumPointer = element(by.className("pointer-size-1 selected"));
  var bgColors = element.all(by.name('bgColorOption'));
  var inColorBg = bgColors.get(0);
  var blackAndWhiteBg = bgColors.get(1);
  var mouseRadioBtn = element(by.id("device-type-0"));
  var touchscreenRadioBtn = element(by.id("device-type-1"));
  var trackballRadioBtn = element(by.id("device-type-2"));
  var joystickRadioBtn = element(by.id("device-type-3"));
  var keyRadioBtn = element(by.id("device-type-4"));
  var keyTrackballRadioBtn = element(by.id("device-type-5"));
  var keyJoystickRadioBtn = element(by.id("device-type-6"));
  var loggedUserMenu = element(by.id("loggedUser"));

  this.navigateToEditUserSettingsPage = () => {
    loggedUserMenu.click();
    userSettingsMenuItem.click();
  };

  this.isWhiteColorSelected = () => {
    return whiteColor.isPresent();
  };

  this.isYellowColorSelected = () => {
    return yellowColor.isPresent();
  };

  this.isGreenColorSelected = () => {
    return greenColor.isPresent();
  };

  this.isBlueColorSelected = () => {
    return blueColor.isPresent();
  };

  this.isRedColorSelected = () => {
    return redColor.isPresent();
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

  this.userSettingsSave = () => {
    saveSettingsBtn.click();
  };

  this.isColorThemeSelected = () => {
    return inColorBg.getAttribute().isSelected();
  };

  this.isBWThemeSelected = () => {
    return blackAndWhiteBg.getAttribute().isSelected();
  };
};

module.exports = new UserSettingsEditPage();
