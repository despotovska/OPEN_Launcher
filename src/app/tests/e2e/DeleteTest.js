describe("Game menu delete user", function() {


  var DeleteUser = require("../page/DeletePageObject.js");
  var CreateUserPage = require("../page/CreateUserPageObject.js");
  var LoginPage = require("../page/LoginPageObject.js")

  beforeEach(function() {
    console.log(" Method started");
    browser.get("http://localhost:3000/#/login");
    browser.sleep(500);
    browser.ignoreSynchronization = true;
  });



  it("should delete profile and remove it from the profile page and alert to be displayed", function() {
    CreateUserPage.clickCreateBtn();
    CreateUserPage.createUserName("Josif");
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(1000);
    LoginPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(DeleteUser.returnMessage()).toEqual("Профилот е успешно избришан.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : Delete profile");

  });

  it("should return to the profile page and alert to be displayed", function() {
    DeleteUser.cancelDelete();
    expect(DeleteUser.returnMessage()).toEqual("Бришењето е откажано.");
    browser.sleep(1500);
    browser.ignoreSynchronization = false;
    console.log("Finishing :Cancel Delete profile");
  });



  it("delete button should not be visible if profile is not selected", function() {
    expect(DeleteUser.isDeleteBtnIsVisible()).toBe(false);
    console.log("delete button should not be visible if profile is not selected");
  });

});





