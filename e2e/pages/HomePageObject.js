var HomePage = function () {

  var getToKnowSection = element(by.id("section0"));
  var causeAndEffectGame = element(by.id("0-0"));
  var learnSection = element(by.id("section1"));
  var setsGame = element(by.id("1-0"));
  var whoIsHidingGame = element(by.id("1-1"));
  var puzzleHalvesGame = element(by.id("1-2"));
  var meAndMyHomeGame = element(by.id("1-3"));
  var storyGame = element(by.id("1-4"));

  this.openLearnWithThePCSection = () => {
    learnSection.click();
    browser.sleep(500);
  };

  this.isGetToKnowThePCVisible = () => {
    return getToKnowSection.isPresent();
  };

  this.isLearnWithPCVisible = () => {
    return learnSection.isPresent();
  };

  this.isCauseAndEffectVisible = () => {
    return causeAndEffectGame.isDisplayed();
  };

  this.isSetsVisible = () => {
    return setsGame.isDisplayed();
  };

  this.iswhoIsHidingVisible = () => {
    return whoIsHidingGame.isDisplayed();
  };

  this.isPuzzleHalvesVisible = () => {
    return puzzleHalvesGame.isDisplayed();
  };

  this.isMeAndMyHomeVisible = () => {
    return meAndMyHomeGame.isDisplayed();
  };

  this.isStoryVisible = () => {
    return storyGame.isDisplayed();
  };
};

module.exports = new HomePage();
