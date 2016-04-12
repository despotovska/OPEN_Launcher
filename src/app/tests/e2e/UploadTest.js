describe("Upload picture page", function() {


  var UploadPage = require("../page/UploadPageObject.js");
  var LogInPage = require("../page/LoginPageObject.js");



  beforeEach(function() {
    console.log(" Method started");
    browser.get("http://localhost:3000/#/login");
  });

  it("Logged user can upload picture ", function() {

    LogInPage.logIn();
    UploadPage.uploadPicture();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(UploadPage.returnMessage()).toEqual("Сликата е успешно додадена!");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    LogInPage.logOut();
    console.log("Finishing: Logged user can upload picture");
  });

  it("Upload picture page not available if user is not logged in ", function() {
    expect(UploadPage.isNavigateToUploadPageVisible()).toBe(false);
    console.log("Upload picture page not available if user is not logged in");
  });

  it("Choose picture button should be enabled when user is navigated to Upload page", function() {
    LogInPage.logIn();
    UploadPage.navigateToUploadPage();
    expect(UploadPage.isChooseBtnEnabled()).toBe(true);
    console.log("Choose picture button should be enabled when user is navigated to Upload page");
    LogInPage.logOut();
  });

  it("Upload button should be disabled if file is not selected", function() {
    LogInPage.logIn();
    UploadPage.navigateToUploadPage();
    expect(UploadPage.isUploadBtnEnabled()).toBe(false);
    console.log("Upload button should be disabled if file is not selected");
    LogInPage.logOut();
  });

  it("Path field should be disabled when user is navigated to upload page", function() {
    LogInPage.logIn();
    UploadPage.navigateToUploadPage();
    expect(UploadPage.isPathFieldEnabled()).toBe(false);
    console.log("Path field should be disabled when user is navigated to upload page");
    LogInPage.logOut();
  });


});




