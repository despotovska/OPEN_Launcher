describe("Register page", () => {

  var LogInPage = require("./pages/LoginPageObject.js");
  var RegisterPage = require("./pages/RegisterPageObject.js");

  var loginUrl = "http://localhost:3000/#/login";
  var usernameJosif = "Josif";
  var successMessage = "Успешно внесен корисник.";
  var existingUsernameMessage = "Корисничкото име веќе постои, обидете се да се регистрирате со друго име.";
  var selectPictureMessage = "За да креирате профил, мора да изберете слика.";

  beforeEach(() => {
    browser.get(loginUrl);
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    LogInPage.waitForCreateBtn();
    LogInPage.clickCreateBtn();
    browser.sleep(1000);
  });

  it("should create new profile with the default options", () => {
    RegisterPage.createUserWithDefaultSettings(usernameJosif);
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnAlertMessage()).toEqual(successMessage);
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    LogInPage.filterUsernameJosif();
    LogInPage.deleteFirstProfile();
  });

  it("should create new profile with cyrillic letters username", () => {
    RegisterPage.createUserWithDefaultSettings("Јосиф");
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnAlertMessage()).toEqual(successMessage);
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    LogInPage.filterUsernameЈосиф();
    LogInPage.deleteFirstProfile();
  });

  it("should not be possible a profile to be created with a same name as an existing profile", () => {
    RegisterPage.createUserWithDefaultSettings(usernameJosif);
    LogInPage.waitForCreateBtn();
    LogInPage.clickCreateBtn();
    RegisterPage.createUserWithDefaultSettings(usernameJosif);
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnAlertMessage()).toEqual(existingUsernameMessage);
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    RegisterPage.goBackToLoginPage();
    LogInPage.filterUsernameJosif();
    LogInPage.deleteFirstProfile();
  });

  it("should display five pointer colors options when in-color background is selected", () => {
    RegisterPage.selectBgColor(0);
    expect(RegisterPage.numberOfColors()).toEqual(5);
  });

  it("should display two pointer colors options when black-and-white background is selected", () => {
    RegisterPage.selectBgColor(1);
    expect(RegisterPage.numberOfColors()).toEqual(2);
  });

  it("should display seven device type options", () => {
    expect(RegisterPage.numberOfDeviceTypes()).toEqual(7);
  });

  it("should not be possible a profile to be created without selecting a profile picture", () => {
    RegisterPage.writeUsername("Dani");
    RegisterPage.clickCreateBtn();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnAlertMessage()).toEqual(selectPictureMessage);
    browser.sleep(500);
    browser.ignoreSynchronization = false;
  });

  it("should not be possible a profile to be created without entering a username", () => {
    RegisterPage.selectRandomPicture();
    expect(RegisterPage.isCreateBtnEnabled()).toBeFalsy();
  });

  it("should not be possible a profile to be created with a special character in the username", () => {
    RegisterPage.writeUsername("Dani#")
    RegisterPage.selectRandomPicture();
    expect(RegisterPage.isCreateBtnEnabled()).toBeFalsy();
  });

  it("should display the back button and it should be clickable when name is populated", () => {
    RegisterPage.writeUsername(usernameJosif);
    RegisterPage.goBackToLoginPage();
    expect(browser.getCurrentUrl()).toEqual(loginUrl);
  });

  it("should display the back button and it should be clickable when picture is selected", () => {
    RegisterPage.selectRandomPicture();
    RegisterPage.goBackToLoginPage();
    expect(browser.getCurrentUrl()).toEqual(loginUrl);
  });
});
