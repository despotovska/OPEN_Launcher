describe("Edit user settings page", () => {

  var RegisterPage = require("./pages/RegisterPageObject.js");
  var LogInPage = require("./pages/LoginPageObject.js");
  var UserSettingsEditPage = require("./pages/UserSettingsEditPageObject.js");

  var rootUrl = "http://localhost:3000/";
  var loginUrl = rootUrl + "#/login";
  var homeUrl = rootUrl + "#/home";
  var successMessage = "Корисничките подесувања се успешно зачувани.";

  beforeEach(() => {
    browser.get(loginUrl);
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    LogInPage.waitForCreateBtn();
    LogInPage.clickCreateBtn();
    browser.sleep(500);
    RegisterPage.createUserWithDefaultSettings("Josif");
    browser.sleep(3000);
    LogInPage.filterUsernameJosif();
    browser.sleep(1000);
    LogInPage.logIn();
    UserSettingsEditPage.navigateToEditUserSettingsPage();
  });

  afterEach(() => {
    browser.sleep(500);
    LogInPage.logOut();
    browser.sleep(2000);
    browser.ignoreSynchronization = true;
    LogInPage.filterUsernameJosif();
    LogInPage.deleteFirstProfile();
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
    expect(RegisterPage.returnAlertMessage()).toEqual(successMessage);
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    expect(UserSettingsEditPage.isBWThemeSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isYellowColorSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isMediumPointerSelected()).toBeTruthy();
    expect(UserSettingsEditPage.isTrackballSelected()).toBeTruthy();
  });
});
