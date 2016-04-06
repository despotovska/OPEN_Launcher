var HomePage = function() {




  var causeAndEffect = element(by.xpath("//*[@id='collapse1']/div/div/figure/a/img"));
  var getToKnowWithPC = element(by.id("collapse1"));
  var learnWithPC = element(by.css("#accordion > div:nth-child(2) > button"));
  var sets = element(by.css("#collapse2 > div > div:nth-child(1) > figure > a > img"));
  var whoIsHiding = element(by.css("#collapse2 > div > div:nth-child(2) > figure > a > img"));
  var puzzleHalves = element(by.css("#collapse2 > div > div:nth-child(3) > figure > a > img"));
  var meAndMyHome = element(by.css("#collapse2 > div > div:nth-child(4) > figure > a > img"));
  var story = element(by.css("#collapse2 > div > div:nth-child(5) > figure > a > img"));


  this.get = function(value) {
    browser.get(value);
  };

  this.clickLearnWithPC = function() {
    learnWithPC.click();
    browser.sleep(500);
  };

  this.isGetToKnowWithPCPresent = function() {
    return getToKnowWithPC.isPresent();
  };

  this.isLearnWithPCPresent = function() {
    return learnWithPC.isPresent();
  };

  this.isCauseAndEffectVisible = function() {
    return causeAndEffect.isDisplayed();
  };

  this.isSetsVisible = function() {
    return sets.isDisplayed();
  };

  this.iswhoIsHidingVisible = function() {
    return whoIsHiding.isDisplayed();
  };

  this.isPuzzleHalvesVisible = function() {
    return puzzleHalves.isDisplayed();
  };

  this.isMeAndMyHomeVisible = function() {
    return meAndMyHome.isDisplayed();
  };

  this.isStoryVisible = function() {
    return story.isDisplayed();
  };

};

module.exports = new HomePage();
