var UploadPage = function () {

  var path = require("path");
  var elm = element(by.css('input[type="file"]'));
  var fivaroUpload = "images/krava.png";
  var absolutePath = path.resolve(__dirname, fivaroUpload);
  var navigateToUpload = element(by.id("navBarUpload"));
  var uploadBtn = element(by.css("body > app > div > upload-picture > div > div > div > div > button.btn.btn-success"));
  var alertmessage = element(by.id("messagelabel"));
  var choosePicture = element(by.css("body > app > div > upload-picture > div > div > div > div > div > input"));
  var pathFiled = element(by.css("body > app > div > upload-picture > div > div > div > div > input.form-control"));
  var selectedPicture = element(by.css("body > app > div > upload-picture > div > div > div > div.col-sm-3 > img"));

  this.uploadPicture = () => {
    navigateToUpload.click();
    //make it visible
    browser.executeScript('arguments[0].style.visibility = "visible"; arguments[0].style.overflow = "visible"; arguments[0].style.height = "1px"; arguments[0].style.width = "1px";  arguments[0].style.opacity = 1', elm.getWebElement());
    elm.sendKeys(absolutePath);
    uploadBtn.click();
  };

  this.preUploadPicture = () => {
    navigateToUpload.click();
    //make it visible
    browser.executeScript('arguments[0].style.visibility = "visible"; arguments[0].style.overflow = "visible"; arguments[0].style.height = "1px"; arguments[0].style.width = "1px";  arguments[0].style.opacity = 1', elm.getWebElement());
    elm.sendKeys(absolutePath);
  };

  this.returnMessage = () => {
    return alertmessage.getText();
  };

  this.isUploadPictureShown = () => {
    return selectedPicture.isPresent();
  };

  this.navigateToUploadPage = () => {
    navigateToUpload.click();
  };

  this.isNavigateToUploadPageVisible = () => {
    return navigateToUpload.isPresent();
  };

  this.getCurrentURL = () => {
    return browser.getCurrentUrl();
  };

  this.isUploadBtnEnabled = () => {
    return uploadBtn.isEnabled();
  };

  this.isChooseBtnEnabled = () => {
    return choosePicture.isEnabled();
  };

  this.isPathFieldEnabled = () => {
    return pathFiled.isEnabled();
  };
};

module.exports = new UploadPage();
