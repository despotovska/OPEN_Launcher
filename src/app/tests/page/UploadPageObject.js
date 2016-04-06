var UploadPage = function() {

  var path = require("path");
  var elm = element(by.css('input[type="file"]'));
  var fileToUpload = "../../../../../OPEN_Launcher/src/assets/images/avatars/krava.png";
  var absolutePath = path.resolve(__dirname, fileToUpload);
  var signBtn = element(by.id("btn-login"));
  var navigateToUpload = element(by.id("navBarUpload"));
  var uploadBtn = element(by.css("body > app > div > upload-picture > div > div > div > div > input.btn.btn-success"));
  var alertmessage = element(by.id("messagelabel"));
  var navigateToHome = element(by.css("#bs-example-navbar-collapse-1 > ul > li:nth-child(1) > a"));
  var navigateHome = element(by.css("body > app > nav > div > div.navbar-header > a"));
  var uploadBtn = element(by.css("body > app > div > upload-picture > div > div > div > div > input.btn.btn-success"));
  var choosePicture = element(by.css("body > app > div > upload-picture > div > div > div > div > div > input"));
  var pathFiled = element(by.css("body > app > div > upload-picture > div > div > div > div > input.form-control"));

  this.uploadPicture = function() {
    navigateToUpload.click();
    console.log("Navigated to upload page");
    //make it visible
    browser.executeScript('arguments[0].style.visibility = "visible"; arguments[0].style.overflow = "visible"; arguments[0].style.height = "1px"; arguments[0].style.width = "1px";  arguments[0].style.opacity = 1', elm.getWebElement());
    elm.sendKeys(absolutePath);
    console.log("Path sent");
    uploadBtn.click();
    console.log("Picture uploaded");
  };

  this.returnMessage = function() {
    return alertmessage.getText();
  };

  this.navigateToHomePage = function() {
    navigateToHome.click();
  };

  this.navigateToUploadPage = function() {
    navigateToUpload.click();
  }

  this.getCurrentURL = function() {
    return browser.getCurrentUrl();
  };

  this.navigateToLogInPage = function() {
    navigateHome.click();
  }

  this.isUploadBtnEnabled = function() {
    return uploadBtn.isEnabled();
  };

  this.isChooseBtnEnabled = function() {
    return choosePicture.isEnabled();;
  };

  this.isPathFieldEnabled = function() {
    return pathFiled.isEnabled();
  };

};

module.exports = new UploadPage();
