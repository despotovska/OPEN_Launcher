var StatisticsPage = function () {

  var loggedUserMenu = element(by.id("loggedUser"));
  var statisticsMenuItem = element(by.id("gameStatistics"));
  var pickedGame = element(by.className("game-picker"));
  var deviceHeader = element(by.id("device_type"));
  var durationHeader = element(by.id("game_time"));
  var iterationsHeader = element(by.id("iteration_passed"));
  var wrongTriesHeader = element(by.id("invalid_click_count"));

  this.getDefaultPickerOption = () => {
    return pickedGame.getAttribute("value");
  };

  this.isDeviceHeaderVisible = () => {
    return deviceHeader.isPresent();
  };

  this.isDurationHeaderVisible = () => {
    return durationHeader.isPresent();
  };

  this.isIterationsHeaderVisible = () => {
    return iterationsHeader.isPresent();
  };

  this.isWrongTriesHeaderVisible = () => {
    return wrongTriesHeader.isPresent();
  };

  this.navigateToStatisticsPage = () => {
    loggedUserMenu.click();
    statisticsMenuItem.click();
  };
};

module.exports = new StatisticsPage();
