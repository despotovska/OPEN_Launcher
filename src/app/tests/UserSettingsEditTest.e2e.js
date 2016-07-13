describe("Edit user settings page", () => {
  var RegisterPage = require("./pages/RegisterPageObject.js");
  var LogInPage = require("./pages/LoginPageObject.js");
  var UserSettingsEditPage = require("./pages/UserSettingsEditPageObject.js");

  var loginUrl = "http://localhost:3000/#/login";
  var homeUrl = "http://localhost:3000/#/home";
  var successMessage = "Корисничките подесувања се успешно зачувани.";

  beforeEach(() => {
    UserSettingsEditPage.get(loginUrl);
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    RegisterPage.waitforCreateBtn();
    RegisterPage.clickCreateBtn();
    browser.sleep(500);
    RegisterPage.createUserWithDefaultSettings("Josif");
    browser.sleep(3000);
    LogInPage.filterUsernameJosif();
    browser.sleep(1000);
    UserSettingsEditPage.logInFilteredUser();
    UserSettingsEditPage.navigateToEditUserSettingsPage();
  });

  afterEach(() => {
    LogInPage.logOut();
    browser.sleep(2000);
    browser.ignoreSynchronization = true;
    LogInPage.filterUsernameJosif();
    LogInPage.deleteFilteredUser();
  });

  it("should create new profile with the default settings", () => {
    expect(UserSettingsEditPage.isColorThemeSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isWhiteColorSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isSmallPointerSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isMouseSelected()).toBeTruthy();
  });

  it("should create new profile with default settings and change them", () => {
    RegisterPage.selectBgColor(1);
    RegisterPage.selectMediumPointer();
    RegisterPage.selectYellowColor();
    RegisterPage.selectTrackball();
    UserSettingsEditPage.userSettingsSave();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(RegisterPage.returnMessage()).toEqual(successMessage);
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    expect(UserSettingsEditPage.isBWThemeSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isYellowColorSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isMediumPointerSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isTrackballSelected()).toBeTruthy();
  });
});
