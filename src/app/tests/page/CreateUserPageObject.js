var CreateUserPage = function() {




  var createBtnFirstPage = element(by.id("createUser"));
  var enterName = element(by.id("username"));
  var createBtnSecondPage = element(by.id("createNewUser"));
  var createdProfilMsg = element(by.xpath("/html/body/app/div/login/div/div/div[1]/label"));
  var alertmessage = element(by.id("messagelabel"));
  var image = element.all(by.className("img-circle"));
  var firstimage = element.all(by.className("img-circle")).get(1);
  var backBtn = element(by.id("backToLogin"));
  var name;
  var imageNumber;
  var randomNo;
  var autoGenerateUserName;
  var imageurl;
  var selectedProfileImg = element(by.css("body > app > div > undefined > div > div > div.col-md-2.col-sm-4 > div > div > div > div:nth-child(2) > img"));
  var profileName = element(by.css("body > app > div > undefined > div > div > div.col-md-2.col-sm-4 > div > div > div > div.title.text-center > label"));
  var nameProfile;
  var radiobtn = element.all(by.css('input[type="radio"]'));
  var colors = element.all(by.className('color-box'));
  var colorRed = element(by.id("pointer-color-4"));
  var countedcolors;
  var option;
  var selectedImage;
  var whiteColor = element(by.id("pointer-color-0"));
  var blueColor = element(by.id("pointer-color-3"));
  var greenColor = element(by.id("pointer-color-2"));
  var yellowColor = element(by.id("pointer-color-1"));
  var smallPointer = element(by.id("pointer-size-0"));
  var mediumPointer = element(by.id("pointer-size-1"));

  this.get = function(value) {
    browser.get(value);
  };

  selectRandomPicture = function() {

    randomNo = Math.floor(Math.random() * (12)) + 1;
    console.log("Random broj: " + randomNo);
    selectedImage = image.get(randomNo);
    imageurl = selectedImage.getAttribute('src');
    selectedImage.click();
    console.log("Kliknata slikicka");
  };

  /*autoGenerateUserName = function() {
    autoGenerateUserName = "Auto-UserName-";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 3; i++) {
      autoGenerateUserName += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    browser.sleep(500);
    enterName.sendKeys(autoGenerateUserName);
  };

  this.createUserSettingsRandom = function() {
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    autoGenerateUserName = "Auto-UserName-";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 3; i++) {
      autoGenerateUserName += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    browser.sleep(500);
    enterName.sendKeys(autoGenerateUserName);
    selectRandomPicture();
  }

  this.createAutoGenerateUserName = function() {
    selectRandomPicture();
    autoGenerateUserName();
    createBtnSecondPage.click();
  };
*/
  this.selectRadioButton = function(option) {
    var radioselect = radiobtn.get(option);
    radioselect.getAttribute("innerHTML").then(function(text) {
      var selectedOption = text;
      console.log("Selektirana opcija" + selectedOption);
      radioselect.click();
    });
  };

  selectRadioButton = function(option) {
    var radioselect = radiobtn.get(option);
    radioselect.getAttribute("innerHTML").then(function(text) {
      var selectedOption = text;
      console.log("Selektirana opcija" + selectedOption);
      radioselect.click();
    });
  };

  this.createPredefinedUserName = function(name) {
    browser.sleep(2000);
    selectRandomPicture();
    enterName.sendKeys(name);
    createBtnSecondPage.click();
  };

   this.createUserName = function(name) {
    browser.sleep(2000);
    selectRandomPicture();
    enterName.sendKeys(name);
  };

  this.createPredefinedUserNameWithUserSettings = function(name) {
    browser.sleep(2000);
    selectRandomPicture();
    enterName.sendKeys(name);
    browser.sleep(500);
    selectRadioButton("0");
    mediumPointer.click();
    colorRed.click();
    createBtnSecondPage.click();
  };

  this.numberOfColors = function() {
    return colors.count();
  };

  this.clickCreateBtnAfter = function() {
    createBtnSecondPage.click();
  };

  this.clickCreateBtn = function() {
    createBtnFirstPage.click();
  };

  this.writeName = function(name) {
    enterName.sendKeys(name);
  };

  this.selectPicture = function() {
    selectRandomPicture();
  };

  this.clickBack = function() {
    backBtn.click();
  };

  this.returnMessage = function() {
    return alertmessage.getText();
  };

  this.isCreateBtnEnabled = function() {
    return createBtnSecondPage.isEnabled();
  };

  this.filterUsername = function(filter) {
    enterName.sendKeys(filter);
  };

  this.clearFilter = function() {
    enterName.clear();
  };

  this.getImageUrl = function() {
    return imageurl;
  };

  this.getProfileImageUrl = function() {
    return selectedProfileImg.getAttribute('src');
  };

  this.getCurrentURL = function() {
    return browser.getCurrentUrl();
  };

  this.isRedPresent = function() {
    return colorRed.isPresent();
  };


  this.waitforCreateBtn = function() {
    browser.wait(EC.visibilityOf(createBtnFirstPage), 5000);
  };

  this.waitforCreateBtnSecondPage = function() {
    browser.wait(EC.visibilityOf(createBtnSecondPage), 5000);
  };

  this.selectMediumPointer = function() {
    mediumPointer.click();
  };

  this.selectSmallPointer = function() {
    smallPointer.click();
  };

  this.selectRedColor = function() {
    colorRed.click();
  };

  this.selectGreenColor = function() {
    greenColor.click();
  };

  this.selectBlueColor = function() {
    blueColor.click();
  };

  this.selectWhiteColor = function() {
    whiteColor.click();
  };

  this.selectYellowColor = function() {
    yellowColor.click();
  };


};

module.exports = new CreateUserPage();
