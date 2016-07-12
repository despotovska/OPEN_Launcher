describe("Home page", () => {
  var LogInPage = require("../page/LoginPageObject.js");
  var HomePage = require("../page/HomePageObject.js");
  var UserSettingsEditPage = require("../page/UserSettingsEditPageObject.js")

  beforeEach(() => {
    UserSettingsEditPage.get("http://localhost:3000/#/login");
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    LogInPage.logIn();
    browser.sleep(500);
  });

  afterEach(() => {
    LogInPage.logOut();
  });

  it("should display the get-to-know-the-PC games section", () => {
    expect(HomePage.isGetToKnowThePCPresent()).toBeTruthy();
  });

  it("should display the learning-with-the-PC games section", () => {
    expect(HomePage.isLearnWithPCPresent()).toBeTruthy();
  });

  it("should display the Cause-and-Effect game in the get-to-know-the-PC section", () => {
    expect(HomePage.isCauseAndEffectVisible()).toBeTruthy();
  });

  it("should display the Sets game in the learning-with-the-PC section", () => {
    HomePage.clickLearnWithPC();
    expect(HomePage.isSetsVisible()).toBeTruthy();
  });

  it("should display the Who-is-hiding game in the learning-with-the-PC section", () => {
    HomePage.clickLearnWithPC();
    expect(HomePage.iswhoIsHidingVisible()).toBeTruthy();
  });

  it("should display the Puzzle/Halves game in the learning-with-the-PC section", () => {
    HomePage.clickLearnWithPC();
    expect(HomePage.isPuzzleHalvesVisible()).toBeTruthy();
  });

  it("should display the Me-and-my-home game in the learning-with-the-PC section", () => {
    HomePage.clickLearnWithPC();
    expect(HomePage.isMeAndMyHomeVisible()).toBeTruthy();
  });

  it("should display the Story game in the learning-with-the-PC section", () => {
    HomePage.clickLearnWithPC();
    expect(HomePage.isStoryVisible()).toBeTruthy();
  });
});
