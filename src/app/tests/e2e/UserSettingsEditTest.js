describe("Game menu edit user settings", function () {


  var CreateUserPage = require("../page/CreateUserPageObject.js");
  var LogInPage = require("../page/LoginPageObject.js");
  var DeleteUser = require("../page/DeletePageObject.js");
  var UserSettingsEditPage = require("../page/UserSettingsEditPageObject.js");


  beforeEach(function () {
    console.log(" Before Method : Before Each Function");
    UserSettingsEditPage.get("http://localhost:3000/#/login");
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    CreateUserPage.waitforCreateBtn();
    CreateUserPage.clickCreateBtn();
    browser.sleep(500);

  });

  it("User can create new user with default settings", function () {
    CreateUserPage.createPredefinedUserName("Josif");
    browser.sleep(3000);
    LogInPage.filterUsernameJosif();
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.openUserSettings();
    console.log("user settings edit open");
    expect(UserSettingsEditPage.isColorThemeSelected()).toBe(true);
    expect(UserSettingsEditPage.isWhiteColorSelected()).toBe(true);
    expect(UserSettingsEditPage.isSmallPointerSelected()).toBe(true);
    expect(UserSettingsEditPage.isMouseSelected()).toBe(true);
    LogInPage.logOut();
    browser.sleep(2000);
    browser.ignoreSynchronization = true;
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();

  });

  it("User can create new user with pointer size m pointer color red and device type touchscreen", function () {
    CreateUserPage.createPredefinedUserNameWithUserSettings("Josif");
    browser.sleep(3000);
    LogInPage.filterUsernameJosif();
    browser.sleep(1000);
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.openUserSettings();
    console.log("user settings edit open");
    expect(UserSettingsEditPage.isColorThemeSelected()).toBe(true);
    expect(UserSettingsEditPage.isRedColorSelected()).toBe(true);
    expect(UserSettingsEditPage.isMediumPointerSelected()).toBe(true);
    expect(UserSettingsEditPage.isTouchScreenSelected()).toBe(true);
    LogInPage.logOut();
    browser.sleep(2000);
    browser.ignoreSynchronization = true;
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user with default settings and change them", function () {
    CreateUserPage.createPredefinedUserName("Josif");
    browser.sleep(3000);
    LogInPage.filterUsernameJosif();
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.openUserSettings();
    browser.sleep(3000);
    console.log("user settings edit open");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.selectTouchscreen();
    UserSettingsEditPage.userSettingsSave();
    browser.sleep(3500);
    browser.get("http://localhost:3000/#/home");
    UserSettingsEditPage.openUserSettings();
    browser.sleep(3000);
    expect(UserSettingsEditPage.isBWThemeSelected()).toBe(true);
    expect(UserSettingsEditPage.isYellowColorSelected()).toBe(true);
    expect(UserSettingsEditPage.isMediumPointerSelected()).toBe(true);
    expect(UserSettingsEditPage.isTouchScreenSelected()).toBe(true);
    LogInPage.logOut();
    browser.sleep(2000);
    browser.ignoreSynchronization = true;
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });


});
