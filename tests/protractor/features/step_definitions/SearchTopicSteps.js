/* jshint strict: false */
var utils = require('../src/Utils')();
var ApplicationMenu = require('../src/ApplicationMenu')();
var SearchTopicPage = require('../src/SearchTopicPage')();

var myStepDefinitionsWrapper = function() {
  this.Given(/^I am on the search topic page$/, function (callback) {
    ApplicationMenu.clickSearchTopic(callback);
  });

  this.Then(/^I see the label for the input reads 'Search for a topic'$/, function (callback) {
    utils.ensureElementText('#search-topic-header-text', 'Search for a topic', callback);
  });

  this.Then(/^I can type into the search topic input field and select the first entry$/, function (callback) {
    SearchTopicPage.enterSearchText('Test', callback);
  });

  this.Then(/^I can view the attributes page$/, function (callback) {
    utils.ensureElementIsPresent('.search-attributes-header', callback);
  });

  this.Then(/^I can type into the search topic input field and press enter$/, function (callback) {
    SearchTopicPage.getSearchList('Test', callback);
  });

  this.Then(/^I should see a search results list table$/, function (callback) {
    utils.ensureElementText('#table-head-topic', 'Topic', callback);
  });

  this.Then(/^There are search results listed$/, function (callback) {
    utils.ensureRepeatsExists('topic in model.result', callback);
  });


  this.Given(/^I am viewing the topic '(.+)'$/, function (arg1, callback) {
    SearchTopicPage.goToViewTopicPage(arg1, callback);
  });

  this.Then(/^The navigation for attributes should be active$/, function (callback) {
    utils.ensureElementContainsClass('#view-nav-attrs', 'active', callback);
  });

  this.Then(/^The topic is displayed in the header of the attributes page$/, function (callback) {
    utils.ensureElementText('.search-attributes-header', 'Porteus Maze Test', callback);
  });

  this.Then(/^I can find a button to edit the topic$/, function (callback) {
    utils.ensureElementIsPresent('#topic-view-action-edit', callback);
  });

  this.Then(/^I can find a button to delete the topic$/, function (callback) {
    utils.ensureElementIsPresent('#topic-view-action-delete', callback);
  });

  this.Then(/^I can find a button to go to the source$/, function (callback) {
    utils.ensureElementIsPresent('#topic-view-action-source', callback);
  });

  this.Then(/^I can change the view topic tab to related topics$/, function (callback) {
    SearchTopicPage.clickRelatedTopics(callback);
  });

  this.Then(/^The navigation for related topics should be active$/, function (callback) {
    utils.ensureElementContainsClass('#view-nav-topics', 'active', callback);
  });

  this.Then(/^I can change the view topic tab to forms$/, function (callback) {
    SearchTopicPage.clickForms(callback);
  });

  this.Then(/^The navigation for forms should be active$/, function (callback) {
    utils.ensureElementContainsClass('#view-nav-forms', 'active', callback);
  });

  this.Then(/^I can switch to the edit topic page$/, function (callback) {
    SearchTopicPage.goToEditTopicPage(callback);
  });

  this.Then(/^The edit topic page topic name is '(.+)'$/, function (arg1, callback) {
    utils.ensureElementValue('#topic-name', arg1, callback);
  });

  this.Then(/^The original name is filled out$/, function (callback) {
    utils.ensureElementValueNotEmpty('#new-topic-original-name').then(function() {
      callback();
    });
  });

  this.Then(/^I can switch to editing forms$/, function (callback) {
    SearchTopicPage.clickEditFormsTab(callback);
  });

  this.Then(/^The default form is the same, '(.+)'$/, function (arg1, callback) {
    utils.ensureElementValue('#default-form', arg1, callback);
  });

  this.Then(/^I can switch to editing related topics$/, function (callback) {
    SearchTopicPage.clickEditSearchTab(callback);
  });

  this.Then(/^There should a list of related topics$/, function (callback) {
    utils.ensureRepeatsExists('relatedConcept in form.relatedConcepts', callback);
  });
};

module.exports = myStepDefinitionsWrapper;
