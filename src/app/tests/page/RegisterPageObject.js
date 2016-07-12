var RegisterPage = function () {

  var enterName = element(by.id("username"));
  var createBtnFirstPage = element(by.id("createUser"));
  var createBtnSecondPage = element(by.id("createNewUser"));
  var backBtn = element(by.id("backToLogin"));
  var alertmessage = element(by.id("messagelabel"));
  var images = element.all(by.className("img-circle"));
  var imageurl;
  var bgColors = element.all(by.name('bgColorOption'));

  var colors = element.all(by.className('color-box'));
  var whiteColor = element(by.id("pointer-color-0"));
  var yellowColor = element(by.id("pointer-color-1"));
  var greenColor = element(by.id("pointer-color-2"));
  var blueColor = element(by.id("pointer-color-3"));
  var colorRed = element(by.id("pointer-color-4"));

  var smallPointer = element(by.id("pointer-size-0"));
  var mediumPointer = element(by.id("pointer-size-1"));

  var deviceTypes = element.all(by.name("deviceTypesOption"));
  var mouse = element(by.id("device-type-0"));
  var touchscreen = element(by.id("device-type-1"));
  var trackball = element(by.id("device-type-2"));
  var joystick = element(by.id("device-type-3"));
  var key = element(by.id("device-type-4"));
  var keyTrackball = element(by.id("device-type-5"));
  var keyJoystick = element(by.id("device-type-6"));

  this.get = (value) => {
    browser.get(value);
  };

  selectRandomPicture = () => {
    var randomNo = Math.floor(Math.random() * (12)) + 1;
    var selectedImage = images.get(randomNo);
    imageurl = selectedImage.getAttribute('src');
    selectedImage.click();
  };

  this.selectBgColor = (option) => {
    var radioselect = bgColors.get(option);
    radioselect.getAttribute("innerHTML").then((text) => {
      radioselect.click();
    });
  };

  this.createPredefinedUserName = (name) => {
    this.createUserName(name);
    createBtnSecondPage.click();
  };

  this.createUserName = (name) => {
    selectRandomPicture();
    enterName.sendKeys(name);
    browser.sleep(500);
  };

  this.createUserWithDefaultSettings = (name) => {
    this.createUserName(name);
    this.selectBgColor(0);
    smallPointer.click();
    whiteColor.click();
    mouse.click();
    createBtnSecondPage.click();
  };

  this.numberOfColors = () => {
    return colors.count();
  };

  this.numberOfDeviceTypes = () => {
    return deviceTypes.count();
  };

  this.clickCreateBtnSecondPage = () => {
    browser.sleep(500);
    createBtnSecondPage.click();
  };

  this.clickCreateBtn = () => {
    createBtnFirstPage.click();
  };

  this.writeName = (name) => {
    enterName.sendKeys(name);
  };

  this.selectPicture = () => {
    selectRandomPicture();
  };

  this.clickBack = () => {
    backBtn.click();
  };

  this.returnMessage = () => {
    return alertmessage.getText();
  };

  this.isCreateBtnEnabled = () => {
    return createBtnSecondPage.isEnabled();
  };

  this.filterUsername = (filter) => {
    enterName.sendKeys(filter);
  };

  this.clearFilter = () => {
    enterName.clear();
  };

  this.getImageUrl = () => {
    return imageurl;
  };

  this.getCurrentURL = () => {
    return browser.getCurrentUrl();
  };

  this.isRedPresent = () => {
    return colorRed.isPresent();
  };

  this.waitforCreateBtn = () => {
    browser.wait(EC.visibilityOf(createBtnFirstPage), 5000);
  };

  this.waitforCreateBtnSecondPage = () => {
    browser.wait(EC.visibilityOf(createBtnSecondPage), 5000);
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
    mouse.click();
  };

  this.selectTouchscreen = () => {
    touchscreen.click();
  };

  this.selectTrackball = () => {
    trackball.click();
  };

  this.selectJoystick = () => {
    joystick.click();
  };

  this.selectMouse = () => {
    mouse.click();
  };

  this.selectTouchscreen = () => {
    touchscreen.click();
  };

  this.selectTrackball = () => {
    trackball.click();
  };

  this.selectKey = () => {
    key.click();
  };

  this.selectKeyTrackball = () => {
    keyTrackball.click();
  };

  this.selectKeyJoystick = () => {
    keyJoystick.click();
  };
};

module.exports = new RegisterPage();
