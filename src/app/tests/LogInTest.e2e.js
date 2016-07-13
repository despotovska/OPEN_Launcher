describe("Login page", () => {
  var LogInPage = require("./pages/LoginPageObject.js");
  var RegisterPage = require("./pages/RegisterPageObject.js");

  var rootUrl = "http://localhost:3000/";
  var loginUrl = rootUrl + "#/login";
  var deletingCanceledMessage = "Бришењето е откажано.";

  beforeEach(() => {
    browser.get(loginUrl);
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
  });

  it("should redirect to login when / is accessed", () => {
    browser.get(rootUrl);
    expect(LogInPage.getCurrentURL()).toEqual(loginUrl);
  });

  it("sign in button should not be visible if profile is not selected", () => {
    expect(LogInPage.signBtnIsVisible()).toBeFalsy();
  });

  it("should log out user", () => {
    LogInPage.logIn();
    LogInPage.logOut();
    expect(LogInPage.getCurrentURL()).toEqual(loginUrl);
  });

  it("should filter profiles by username", () => {
    LogInPage.filterUsername();
    expect(LogInPage.getTextFromFilter()).toContain("Aleksandra");
    LogInPage.filterUsernameClear();
  });

  it("should cancel profile deleting", () => {
    LogInPage.cancelDelete();
    expect(LogInPage.returnMessage()).toEqual(deletingCanceledMessage);
    browser.sleep(1000);
    browser.ignoreSynchronization = false;
  });

  it("should not display a delete button when profile is not selected", () => {
    expect(LogInPage.isDeleteBtnIsVisible()).toBeFalsy();
  });
});

