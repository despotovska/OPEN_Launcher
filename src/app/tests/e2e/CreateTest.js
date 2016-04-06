describe("Game menu log in user", function() {


  var CreateUserPage = require("../page/CreateUserPageObject.js");
  var LogInPage = require("../page/LoginPageObject.js");
  var DeleteUser = require("../page/DeletePageObject.js");




  beforeEach(function() {
    console.log(" Before Method : Before Each Function");
    CreateUserPage.get("http://localhost:3000/#/login");
    CreateUserPage.waitforCreateBtn();
    CreateUserPage.clickCreateBtn();
    browser.sleep(1000);

  });

  it("User can create new user ", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can not create new user with same name ", function() {
    CreateUserPage.createPredefinedUserName("Josif");
    console.log("Kreiran korisnik");
    CreateUserPage.waitforCreateBtn();
    CreateUserPage.clickCreateBtn();
    CreateUserPage.createPredefinedUserName("Josif");
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Корисничкото име веќе постои, обидете се да се регистрирате со друго име.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    CreateUserPage.clickBack();
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
    console.log("Finishing : User with same name already exists");
  });

  it("User can choose random picture", function() {
    CreateUserPage.selectPicture();
  });

  it("When color game is selected there should be 5 colors to select", function() {
    CreateUserPage.createUserSettingsRandom();
    CreateUserPage.selectRadioButton(0);
    expect(CreateUserPage.numberOfColors()).toEqual(5);
  });

  it("When black and white game is selected there should be 2 colors to select", function() {
    CreateUserPage.createUserSettingsRandom();
    CreateUserPage.selectRadioButton(1);
    expect(CreateUserPage.numberOfColors()).toEqual(2);
  });

  it("When color game is selected there should be red color to select", function() {
    CreateUserPage.createUserSettingsRandom();
    expect(CreateUserPage.isRedPresent()).toBe(true);
  });


  it("User can not be created without selecting picture", function() {
    CreateUserPage.writeName("Dani");
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("За да креирате профил, ве молам изберете слика.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User can not be created");

  });

  it("User can not be created without entering name ", function() {
    CreateUserPage.selectPicture();
    expect(CreateUserPage.isCreateBtnEnabled()).toBe(false);
    console.log("Finishing : User can not be created");

  });

  it("Button back is clickable", function() {
    CreateUserPage.clickBack();
    expect(CreateUserPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when name is populated", function() {
    CreateUserPage.writeName("Daniela123");
    CreateUserPage.clickBack();
    expect(CreateUserPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when picture is selected", function() {
    CreateUserPage.selectPicture();
    CreateUserPage.clickBack();
    expect(CreateUserPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when picture is selected and name is populated", function() {
    CreateUserPage.selectPicture();
    CreateUserPage.writeName("DAni");
    CreateUserPage.clickBack();
    expect(CreateUserPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("User can create new user in color version with pointer size m and pointer color red", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectRedColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size m and pointer color white", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size m and pointer color blue", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectBlueColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size m and pointer color green", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectGreenColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size m and pointer color yellow", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });


  it("User can create new user in color version with pointer size s and pointer color red", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectRedColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size s and pointer color white", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size s and pointer color blue", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectBlueColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size s and pointer color green", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectGreenColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size s and pointer color yellow", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size m and pointer color white", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size m and pointer color yellow", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size s and pointer color white", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in BW version with pointer size s and pointer color yellow", function() {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });



});
