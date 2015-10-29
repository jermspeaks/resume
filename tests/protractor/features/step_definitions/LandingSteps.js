/* jshint strict: false */
// var utils = require('../src/Utils')();
var landingPage = require('../src/LandingPage')();
var ApplicationMenu = require('../src/ApplicationMenu')();

var myStepDefinitionsWrapper = function() {

  this.Given(/^I am on the main page$/, function (callback) {
    // this is implicit from before hooks
    callback();
  });

  this.Then(/^The landing page has loaded correctly$/, function (callback) {
    this.expect(this.getPageTitle()).to.eventually.equal('Topic Graph Editor').then(function () {
      callback();
    });
  });

  this.Then(/^I should see the menu options$/, function (callback) {
    var menuCount = landingPage.getMenuCount();
    this.expect(menuCount).to.eventually.equal(3).then(function() {
      callback();
    });
  });

  this.Then(/^I click on the new topics page$/, function (callback) {
    ApplicationMenu.clickNewTopic(callback);
  });

  this.Then(/^I have been redirected to new topics$/, function (callback) {
    this.expect(element(by.css('.concept-header')).getText()).to.eventually.equal('Create a new topic').then(function() {
      callback();
    });
  });

  this.Then(/^I click the main logo$/, function (callback) {
    landingPage.clickMainHeader(callback);
  });

};

module.exports = myStepDefinitionsWrapper;
