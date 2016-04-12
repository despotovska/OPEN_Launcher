describe("Game menu log in page", function() {


  var LogInPage = require("../page/LoginPageObject.js");


  beforeEach(function() {
    console.log(" Method started");
    browser.get("http://localhost:3000/#/login");
  });


  it("should display log in page", function() {
    expect(LogInPage.getTitle()).toEqual("OPEN");
  });


  it("sign in button should not be visible if profile is not selected", function() {
    expect(LogInPage.signBtnIsVisible()).toBe(false);
    console.log("sign in button should not be visible if profile is not selected");
  });

  it("User can log out from home page ", function() {
    LogInPage.logIn();
    LogInPage.logOut();
    expect(LogInPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Finishing : User loged out");
  });


  it("should filter profiles by entering username", function() {
    LogInPage.filterUsername();
    expect(LogInPage.getTextFromFilter()).toContain("Aleksandra");
    LogInPage.filterUsernameClear();
    console.log("Finishing : Filter username");

  });


});

