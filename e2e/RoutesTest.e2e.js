describe("Routes tests", () => {

  var rootUrl = "http://localhost:3000/";
  var loginUrl = rootUrl + "#/login";
  var statisticsUrl = rootUrl + "#/statistics/sets";
  var homeUrl = rootUrl + "#/home";
  var uploadUrl = rootUrl + "#/uploadpicture";
  var userSettingsEditUrl = rootUrl + "#/userSettingsEdit";
  var notFoundUrl = rootUrl + "#/404";
  var invalidUrl = rootUrl + "#/sdasdas";

  it("/ -> should redirect to login", () => {
    browser.get(rootUrl);
    expect(browser.getCurrentUrl()).toEqual(loginUrl);
  });

  it("/home -> should redirect to login when there is no logged in user", () => {
    browser.get(homeUrl);
    expect(browser.getCurrentUrl()).toEqual(loginUrl);
  });

  it("/upload -> should redirect to login when there is no logged in user", () => {
    browser.get(uploadUrl);
    expect(browser.getCurrentUrl()).toEqual(loginUrl);
  });

  it("/userSettingsEdit -> should redirect to login when there is no logged in user", () => {
    browser.get(userSettingsEditUrl);
    expect(browser.getCurrentUrl()).toEqual(loginUrl);
  });

  it("/statistics -> should redirect to login when there is no logged in user", () => {
    browser.get(statisticsUrl);
    expect(browser.getCurrentUrl()).toEqual(loginUrl);
  });

  it("/invalidRoute -> should redirect to 404", () => {
    browser.get(invalidUrl);
    expect(browser.getCurrentUrl()).toEqual(notFoundUrl);
  });
});
