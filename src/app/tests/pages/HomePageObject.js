var HomePage = function () {

  var getToKnowWithPC = element(by.id("collapse0"));
  var causeAndEffect = element(by.css("#collapse0 > div > div:nth-child(1) > figure > a > img"));

  var learnWithPC = element(by.css("#accordion > div:nth-child(2) > button"));
  var sets = element(by.css("#collapse1 > div > div:nth-child(1) > figure > a > img"));
  var whoIsHiding = element(by.css("#collapse1 > div > div:nth-child(2) > figure > a > img"));
  var puzzleHalves = element(by.css("#collapse1 > div > div:nth-child(3) > figure > a > img"));
  var meAndMyHome = element(by.css("#collapse1 > div > div:nth-child(4) > figure > a > img"));
  var story = element(by.css("#collapse1 > div > div:nth-child(5) > figure > a > img"));

  this.get = function (value) {
    browser.get(value);
  };

  this.clickLearnWithPC = () => {
    learnWithPC.click();
    browser.sleep(500);
  };

  this.isGetToKnowThePCPresent = () => {
    return getToKnowWithPC.isPresent();
  };

  this.isLearnWithPCPresent = () => {
    return learnWithPC.isPresent();
  };

  this.isCauseAndEffectVisible = () => {
    return causeAndEffect.isDisplayed();
  };

  this.isSetsVisible = () => {
    return sets.isDisplayed();
  };

  this.iswhoIsHidingVisible = () => {
    return whoIsHiding.isDisplayed();
  };

  this.isPuzzleHalvesVisible = () => {
    return puzzleHalves.isDisplayed();
  };

  this.isMeAndMyHomeVisible = () => {
    return meAndMyHome.isDisplayed();
  };

  this.isStoryVisible = () => {
    return story.isDisplayed();
  };
};

module.exports = new HomePage();
