describe("Game menu log in user", function () {


  var CreateUserPage = require("../page/CreateUserPageObject.js");
  var LogInPage = require("../page/LoginPageObject.js");
  var DeleteUser = require("../page/DeletePageObject.js");




  beforeEach(function () {
    console.log(" Before Method : Before Each Function");
    CreateUserPage.get("http://localhost:3000/#/login");
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
    CreateUserPage.waitforCreateBtn();
    CreateUserPage.clickCreateBtn();
    browser.sleep(1000);

  });

  it("User can create new user ", function () {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user with Macedonian letters ", function () {
    CreateUserPage.createUserName("Јосиф");
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameЈосиф();
    DeleteUser.deleteFilteredUser();
  });

  it("User can not create new user with same name ", function () {
    CreateUserPage.createPredefinedUserName("Josif");
    console.log("Kreiran korisnik");
    CreateUserPage.waitforCreateBtn();
    CreateUserPage.clickCreateBtn();
    CreateUserPage.createPredefinedUserName("Josif");
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Корисничкото име веќе постои, обидете се да се регистрирате со друго име.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    CreateUserPage.clickBack();
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
    console.log("Finishing : User with same name already exists");
  });

  it("User can choose random picture", function () {
    CreateUserPage.selectPicture();
  });

  it("When color game is selected there should be 5 colors to select", function () {
    CreateUserPage.selectRadioButton(0);
    expect(CreateUserPage.numberOfColors()).toEqual(5);
  });

  it("When black and white game is selected there should be 2 colors to select", function () {
    CreateUserPage.selectRadioButton(1);
    expect(CreateUserPage.numberOfColors()).toEqual(2);
  });

  it("When color game is selected there should be red color to select", function () {
    expect(CreateUserPage.isRedPresent()).toBe(true);
  });


  it("User can not be created without selecting picture", function () {
    CreateUserPage.writeName("Dani");
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("За да креирате профил, ве молам изберете слика.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User can not be created");

  });

  it("User can not be created without entering name ", function () {
    CreateUserPage.selectPicture();
    expect(CreateUserPage.isCreateBtnEnabled()).toBe(false);
    console.log("Finishing : User can not be created");

  });

  it("User can not be created with special character in the username ", function () {
    CreateUserPage.writeName("Dani#")
    CreateUserPage.selectPicture();
    expect(CreateUserPage.isCreateBtnEnabled()).toBe(false);
    console.log("Finishing : User can not be created");

  });

  it("Button back is clickable", function () {
    CreateUserPage.clickBack();
    expect(CreateUserPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when name is populated", function () {
    CreateUserPage.writeName("Daniela123");
    CreateUserPage.clickBack();
    expect(CreateUserPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when picture is selected", function () {
    CreateUserPage.selectPicture();
    CreateUserPage.clickBack();
    expect(CreateUserPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when picture is selected and name is populated", function () {
    CreateUserPage.selectPicture();
    CreateUserPage.writeName("DAni");
    CreateUserPage.clickBack();
    expect(CreateUserPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("User can create new user in color version with pointer size m, pointer color red and device type trackball", function () {
    CreateUserPage.createUserName("Josif");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectRedColor();
    CreateUserPage.selectTrackball();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
    LogInPage.filterUsernameJosif();
    DeleteUser.deleteFilteredUser();
  });

  it("User can create new user in color version with pointer size m, pointer color white and device type touchscreen", function () {
    CreateUserPage.createUserName("Touchscreen");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.selectTouchscreen();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m, pointer color blue and device type mouse", function () {
    CreateUserPage.createUserName("Mouse");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectBlueColor();
    CreateUserPage.selectMouse();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m, pointer color green and device type joystick", function () {
    CreateUserPage.createUserName("Joystick");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectGreenColor();
    CreateUserPage.selectJoystick();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m, pointer color yellow and device type joystick", function () {
    CreateUserPage.createUserName("Joystick4");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.selectJoystick();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });


  it("User can create new user in color version with pointer size s, pointer color red and device type trackball", function () {
    CreateUserPage.createUserName("Trackball1");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectRedColor();
    CreateUserPage.selectTrackball();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s, pointer color white and device type touchscreen", function () {
    CreateUserPage.createUserName("Tochscreen1");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.selectTouchscreen();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s, pointer color blue and device type trackball", function () {
    CreateUserPage.createUserName("Trackball2");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectBlueColor();
    CreateUserPage.selectTrackball();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s, pointer color green and device type joystick", function () {
    CreateUserPage.createUserName("Joystick1");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectGreenColor();
    CreateUserPage.selectJoystick();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s, pointer color yellow and device type joystick", function () {
    CreateUserPage.createUserName("Joystick2");
    CreateUserPage.selectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.selectJoystick();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m, pointer color white  and device type touchscreen", function () {
    CreateUserPage.createUserName("Touchscreen1");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.selectTouchscreen();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m, pointer color yellow and device type trackball", function () {
    CreateUserPage.createUserName("Trackball3");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.selectTrackball();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s, pointer color white and device type joystick", function () {
    CreateUserPage.createUserName("Joystick3");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.selectJoystick();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in BW version with pointer size s, pointer color yellow and device type mouse", function () {
    CreateUserPage.createUserName("Mouse1");
    CreateUserPage.selectRadioButton("1");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.selectMouse();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.returnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(2000);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });
});
