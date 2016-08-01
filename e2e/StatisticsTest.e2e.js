describe("Statistics page", () => {

  var StatisticsPage = require("./pages/StatisticsPageObject.js");
  var RegisterPage = require("./pages/RegisterPageObject.js");
  var LogInPage = require("./pages/LoginPageObject.js");

  var loginUrl = "http://localhost:3000/#/login";

  beforeEach(() => {
    browser.get(loginUrl);
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    LogInPage.logIn();
    browser.sleep(500);
    StatisticsPage.navigateToStatisticsPage();
  });

  afterEach(() => {
    LogInPage.logOut();
  });

  it("should display Sets headers and statistics by default", () => {
    StatisticsPage.getDefaultPickerOption().then((defaultOption) => {
      expect(defaultOption).toBe('0');
      expect(StatisticsPage.isDeviceHeaderVisible()).toBeTruthy();
      expect(StatisticsPage.isDurationHeaderVisible()).toBeTruthy();
      expect(StatisticsPage.isIterationsHeaderVisible()).toBeTruthy();
      expect(StatisticsPage.isWrongTriesHeaderVisible()).toBeTruthy();
    });
  });
});
