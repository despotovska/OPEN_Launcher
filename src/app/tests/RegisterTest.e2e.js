describe("Register page", () => {
  var RegisterPage = require("./pages/RegisterPageObject.js");
  var LogInPage = require("./pages/LoginPageObject.js");

  var loginUrl = "http://localhost:3000/#/login";
  var usernameJosif = "Josif";
  var successMessage = "Успешно внесен корисник.";
  var existingUsernameMessage = "Корисничкото име веќе постои, обидете се да се регистрирате со друго име.";
  var selectPictureMessage = "За да креирате профил, ве молам изберете слика.";

  beforeEach(() => {
    RegisterPage.get(loginUrl);
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    RegisterPage.waitforCreateBtn();
    RegisterPage.clickCreateBtn();
    browser.sleep(1000);
  });

  it("should create new profile with the default options", () => {
    RegisterPage.createPredefinedUserName(usernameJosif);
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnMessage()).toEqual(successMessage);
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    LogInPage.filterUsernameJosif();
    LogInPage.deleteFilteredUser();
  });

  it("should create new profile with cyrillic letters username", () => {
    RegisterPage.createPredefinedUserName("Јосиф");
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnMessage()).toEqual(successMessage);
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    LogInPage.filterUsernameЈосиф();
    LogInPage.deleteFilteredUser();
  });

  it("should not be possible a profile to be created with a same name as an existing profile", () => {
    RegisterPage.createPredefinedUserName(usernameJosif);
    RegisterPage.waitforCreateBtn();
    RegisterPage.clickCreateBtn();
    RegisterPage.createPredefinedUserName(usernameJosif);
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnMessage()).toEqual(existingUsernameMessage);
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    RegisterPage.clickBack();
    LogInPage.filterUsernameJosif();
    LogInPage.deleteFilteredUser();
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
    RegisterPage.writeName("Dani");
    RegisterPage.clickCreateBtnSecondPage();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnMessage()).toEqual(selectPictureMessage);
    browser.sleep(500);
    browser.ignoreSynchronization = false;
  });

  it("should not be possible a profile to be created without entering a username", () => {
    RegisterPage.selectPicture();
    expect(RegisterPage.isCreateBtnEnabled()).toBeFalsy();
  });

  it("should not be possible a profile to be created with a special character in the username", () => {
    RegisterPage.writeName("Dani#")
    RegisterPage.selectPicture();
    expect(RegisterPage.isCreateBtnEnabled()).toBeFalsy();
  });

  it("should display the back button and it should be clickable when name is populated", () => {
    RegisterPage.writeName(usernameJosif);
    RegisterPage.clickBack();
    expect(RegisterPage.getCurrentURL()).toEqual(loginUrl);
  });

  it("should display the back button and it should be clickable when picture is selected", () => {
    RegisterPage.selectPicture();
    RegisterPage.clickBack();
    expect(RegisterPage.getCurrentURL()).toEqual(loginUrl);
  });
});
