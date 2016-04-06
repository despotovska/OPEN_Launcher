describe("Game menu edit user settings", function() {


  var LogInPage = require("../page/LoginPageObject.js");
  var HomePage = require("../page/HomePageObject.js");
  var UserSettingsEditPage = require("../page/UserSettingsEditPageObject.js")

  beforeEach(function() {
    console.log(" Before Method : Before Each Function");
    UserSettingsEditPage.get("http://localhost:3000/#/login");
    LogInPage.logIn();
    browser.sleep(500);

  });

  it("When user signs in there should be section with name get to know with PC", function() {
    expect(HomePage.isGetToKnowWithPCPresent()).toBe(true);
    console.log("get to know with PC section is present");
  });

  it("When user signs in there should be section with name learn with PC", function() {
    expect(HomePage.isLearnWithPCPresent()).toBe(true);
    console.log("Learn with PC section is present");
  });

  it("When user signs in section with name get to know with PC should be game to select called Cause and Effect", function() {
    expect(HomePage.isCauseAndEffectVisible()).toBe(true);
    console.log("Game Cause and Effect is visible");
  });

  it("When user signs in section with name learn with PC there should be game to select called Sets", function() {
    HomePage.clickLearnWithPC();
    expect(HomePage.isSetsVisible()).toBe(true);
    console.log("Game Sets is visible");
  });

  it("When user signs in section with name learn with PC there should be game to select called Who is hiding", function() {
    HomePage.clickLearnWithPC();
    expect(HomePage.iswhoIsHidingVisible()).toBe(true);
    console.log("Game Who is hiding is visible");
  });

  it("When user signs in section with name learn with PC there should be game to select called Puzzle/Halves", function() {
    HomePage.clickLearnWithPC();
    expect(HomePage.isPuzzleHalvesVisible()).toBe(true);
    console.log("Puzzle/Halves game is visible");
  });

  it("When user signs in section with name learn with PC there should be game to select called Me and my home", function() {
    HomePage.clickLearnWithPC();
    expect(HomePage.isMeAndMyHomeVisible()).toBe(true);
    console.log("Me and my home game is visible");
  });

  it("When user signs in section with name learn with PC there should be game to select called Story", function() {
    HomePage.clickLearnWithPC();
    expect(HomePage.isStoryVisible()).toBe(true);
    console.log("Story game is visible");
    LogInPage.logOut();
  });



});
