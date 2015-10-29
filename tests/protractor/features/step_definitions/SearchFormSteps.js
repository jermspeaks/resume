/* jshint strict: false */
var utils = require('../src/Utils')(),
  ApplicationMenu = require('../src/ApplicationMenu')(),
  searchFormPage = require('../src/searchFormPage')();

var myStepDefinitionsWrapper = function() {

  this.Given(/^I am on the search form page$/, function (callback) {
    ApplicationMenu.clickSearchForm(callback);
  });

  this.Then(/^I see the label for the input reads 'Search For Form Name'$/, function (callback) {
    utils.ensureElementText('#search-form-label-text', 'Search For Form Name', callback);
  });

  this.Then(/^I can search '(.+)' and select the first item on the autocomplete list$/, function (arg1, callback) {
    searchFormPage.enterSearchText(arg1, callback);
  });

  this.Then(/^I can see the name of the form$/, function (callback) {
    utils.ensureElementIsPresent('#form-title-header', callback);
  });

  this.Then(/^There are a list of topic results$/, function (callback) {
    utils.ensureRepeatsExists('topic in results.formTopics', callback);
  });

  this.Then(/^I can search '(.+)' and get a list of resulting forms$/, function (arg1, callback) {
    searchFormPage.getSearchList(arg1, callback);
  });

  this.Then(/^I can see a list of resulting forms$/, function (callback) {
    utils.ensureRepeatsExists('form in model.result', callback);
  });

  this.Then(/^I can select the first form$/, function (callback) {
    searchFormPage.selectFirstFormInList(callback);
  });

  this.Given(/^I am on the view form page for '(.+)'$/, function (arg1, callback) {
    searchFormPage.goToViewFormPage(arg1, callback);
  });

  this.Then(/^I can go to its edit form page$/, function (callback) {
    searchFormPage.clickEditFormPage(callback);
  });

  this.Then(/^I can see its associated topics$/, function (callback) {
    utils.ensureRepeatsExists('topic in formModel.topics', callback);
  });

  this.Then(/^I can add a related topic field$/, function (callback) {
    searchFormPage.addTopicToEdit(callback);
  });

  this.Then(/^That field should be empty$/, function (callback) {
    searchFormPage.checkEmptyLastTopic(callback);
    // callback.pending();
  });
};

module.exports = myStepDefinitionsWrapper;
