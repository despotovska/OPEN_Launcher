var RegisterPage = function () {

  var enterName = element(by.id("username"));
  var createBtn = element(by.id("createNewUser"));
  var backBtn = element(by.id("backToLogin"));
  var alertMessage = element(by.id("messagelabel"));
  var profilePictures = element.all(by.className("img-circle"));
  var whiteColor = element(by.id("pointer-color-0"));
  var yellowColor = element(by.id("pointer-color-1"));
  var greenColor = element(by.id("pointer-color-2"));
  var blueColor = element(by.id("pointer-color-3"));
  var colorRed = element(by.id("pointer-color-4"));
  var smallPointer = element(by.id("pointer-size-0"));
  var mediumPointer = element(by.id("pointer-size-1"))
  var mouseRadioBtn = element(by.id("device-type-0"));
  var touchscreenRadioBtn = element(by.id("device-type-1"));
  var trackballRadioBtn = element(by.id("device-type-2"));
  var joystickRadioBtn = element(by.id("device-type-3"));
  var keyRadioBtn = element(by.id("device-type-4"));
  var keyTrackballRadioBtn = element(by.id("device-type-5"));
  var keyJoystickRadioBtn = element(by.id("device-type-6"));

  this.selectRandomPicture = () => {
    profilePictures.count().then((counted) => {
      var numberOfImages = parseInt(counted);
      var randomNo = Math.floor(Math.random() * (numberOfImages - 1));
      var selectedImage = profilePictures.get(randomNo);
      selectedImage.click();
    });
  };

  this.selectBgColor = (option) => {
    var bgColors = element.all(by.name('bgColorOption'));
    var radioselect = bgColors.get(option);
    radioselect.getAttribute("innerHTML").then((text) => {
      radioselect.click();
    });
  };

  this.createUserWithDefaultSettings = (username) => {
    this.selectRandomPicture();
    browser.sleep(500);
    enterName.sendKeys(username);
    browser.sleep(500);
    this.selectBgColor(0);
    smallPointer.click();
    whiteColor.click();
    mouseRadioBtn.click();
    createBtn.click();
  };

  this.numberOfColors = () => {
    return element.all(by.className('color-box')).count();
  };

  this.numberOfDeviceTypes = () => {
    return element.all(by.name("deviceTypesOption")).count();
  };

  this.clickCreateBtn = () => {
    browser.sleep(500);
    createBtn.click();
  };

  this.writeUsername = (username) => {
    enterName.sendKeys(username);
  };

  this.goBackToLoginPage = () => {
    backBtn.click();
  };

  this.returnAlertMessage = () => {
    return alertMessage.getText();
  };

  this.isCreateBtnEnabled = () => {
    return createBtn.isEnabled();
  };

  this.selectMediumPointer = () => {
    mediumPointer.click();
  };

  this.selectSmallPointer = () => {
    smallPointer.click();
  };

  this.selectRedColor = () => {
    colorRed.click();
  };

  this.selectGreenColor = () => {
    greenColor.click();
  };

  this.selectBlueColor = () => {
    blueColor.click();
  };

  this.selectWhiteColor = () => {
    whiteColor.click();
  };

  this.selectYellowColor = () => {
    yellowColor.click();
  };

  this.selectMouse = () => {
    mouseRadioBtn.click();
  };

  this.selectTouchscreen = () => {
    touchscreenRadioBtn.click();
  };

  this.selectTrackball = () => {
    trackballRadioBtn.click();
  };

  this.selectJoystick = () => {
    joystickRadioBtn.click();
  };

  this.selectMouse = () => {
    mouseRadioBtn.click();
  };

  this.selectTouchscreen = () => {
    touchscreenRadioBtn.click();
  };

  this.selectTrackball = () => {
    trackballRadioBtn.click();
  };

  this.selectKey = () => {
    keyRadioBtn.click();
  };

  this.selectKeyTrackball = () => {
    keyTrackballRadioBtn.click();
  };

  this.selectKeyJoystick = () => {
    keyJoystickRadioBtn.click();
  };
};

module.exports = new RegisterPage();
