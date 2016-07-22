var UploadPage = function () {

  var path = require("path");
  var image = "images/krava.png";
  var absolutePath = path.resolve(__dirname, image);
  var fileInput = element(by.css('input[type="file"]'));
  var uploadManuItem = element(by.id("navBarUpload"));
  var uploadBtn = element(by.id("upload-btn"));
  var chooseBtn = element(by.id("choose-img"));
  var alertMessage = element(by.id("messagelabel"));
  var pathFiled = element(by.id("path"));
  var uploadedPicture = element(by.id("preview-img"));

  this.uploadPicture = () => {
    this.preUploadPicture();
    uploadBtn.click();
  };

  this.preUploadPicture = () => {
    uploadManuItem.click();
    // make it visible
    browser.executeScript('arguments[0].style.visibility = "visible"; arguments[0].style.overflow = "visible"; arguments[0].style.height = "1px"; arguments[0].style.width = "1px";  arguments[0].style.opacity = 1',
      fileInput.getWebElement());
    fileInput.sendKeys(absolutePath);
  };

  this.returnAlertMessage = () => {
    return alertMessage.getText();
  };

  this.isUploadPictureVisible = () => {
    return uploadedPicture.isPresent();
  };

  this.navigateToUploadPage = () => {
    uploadManuItem.click();
  };

  this.isNavigateToUploadPageVisible = () => {
    return uploadManuItem.isPresent();
  };

  this.isUploadBtnEnabled = () => {
    return uploadBtn.isEnabled();
  };

  this.isChooseBtnEnabled = () => {
    return chooseBtn.isEnabled();
  };

  this.isPathFieldEnabled = () => {
    return pathFiled.isEnabled();
  };
};

module.exports = new UploadPage();
