/* jshint strict: false */
var utils = require('../src/Utils')();
var ApplicationMenu = require('../src/ApplicationMenu')();
var NewTopicPage = require('../src/NewTopicPage')();

var myStepDefinitionsWrapper = function() {

  this.Given(/^I am on the new topic page$/, function (callback) {
    ApplicationMenu.clickNewTopic(callback);
  });

  this.Then(/^I see an error message beneath the input$/, function (callback) {
    utils.ensureElementIsPresent('#topic-name-empty-message', callback);
  });

  this.Then(/^The blank topic error should read \'A Topic Name is Required\'$/, function(callback) {
    utils.ensureElementText('#topic-name-empty-message', 'A Topic Name is Required', callback);
  });

  this.Then(/^I can type into the topic name input$/, function (callback) {
    NewTopicPage.typeTopicName('Sample', callback);
  });

  this.Then(/^The error message goes away$/, function (callback) {
    utils.ensureElementIsNotPresent('#topic-name-empty-message', callback);
  });

  this.Then(/^A submit button appears$/, function (callback) {
    utils.ensureElementIsPresent('#btn-submit', callback);
  });

  this.Then(/^The attributes tab should be active$/, function (callback) {
    utils.ensureElementContainsClass('#side-menu-attrs', 'active', callback);
  });

  this.Then(/^I click on the forms tab$/, function (callback) {
    NewTopicPage.clickFormsTab(callback);
  });

  this.Then(/^The forms tab should be active$/, function (callback) {
    utils.ensureElementContainsClass('#side-menu-forms', 'active', callback);
  });

  this.Then(/^I click on the search tab$/, function (callback) {
    NewTopicPage.clickSearchTab(callback);
  });

  this.Then(/^The search tab should be active$/, function (callback) {
    utils.ensureElementContainsClass('#side-menu-search', 'active', callback);
  });

  this.Then(/^I can type into the 'Original Name' input with an alternative name$/, function (callback) {
    NewTopicPage.typeOriginalName('Sample Name Is Longer', callback);
  });

  this.Then(/^I can toggle the topic as block listed$/, function (callback) {
    NewTopicPage.toggleBlockListed(callback);
  });

  this.Then(/^I can type into 'Categories' input$/, function (callback) {
    NewTopicPage.enterNewCategory('Oh Worthy Sample', callback);
  });

  this.Then(/^A new category tag is created$/, function (callback) {
    utils.ensureElementContainsText('.tag', 'Oh Worthy Sample', callback);
  });

  this.Then(/^I can create another new category tag$/, function (callback) {
    NewTopicPage.enterNewCategory('Another Tremendous Sample', callback);
  });

  this.Then(/^The number of category tags is two$/, function (callback) {
    utils.ensureNumberOfElements('.tag', 2, callback);
  });

  this.Then(/^I can type into the 'Named Entity Types' input and select from autocomplete$/, function (callback) {
    NewTopicPage.enterNewNamedEntityType('Th', callback);
  });

  this.Then(/^A new name entity type tag is created$/, function (callback) {
    utils.ensureElementContainsText('.new-topic-netype-list-item', 'Thing', callback);
  });

  this.Then(/^The default form is shown$/, function (callback) {
    utils.ensureElementValue('#default-form', 'Sample', callback);
  });

  this.Then(/^I click to reveal the form attributes of the default forms$/, function (callback) {
    NewTopicPage.clickFormToggle(callback);
  });

  this.Then(/^I can change the value of the link probability$/, function (callback) {
    NewTopicPage.enterLinkProbability(0.5, undefined, callback);
  });

  this.Then(/^I can change the value of the sense probability$/, function (callback) {
    NewTopicPage.enterSenseProbability(0.9, undefined, callback);
  });

  this.Then(/^I can add a new form$/, function (callback) {
    NewTopicPage.clickAddForm().then(function() {
      utils.ensureElementIsPresent('#form-block-2', callback);
    });
  });

  this.Then(/^I can change the name of the new form$/, function (callback) {
    NewTopicPage.enterFormName('Test Name', '2', callback);
  });

  this.Then(/^The count of the forms should be (\d+)$/, function (arg1, callback) {
    this.expect(NewTopicPage.countForms()).to.eventually.equal(arg1).then(function() {
      callback();
    });
  });

  this.Then(/^I can remove a form$/, function(callback) {
    NewTopicPage.clickRemoveForm(undefined, callback);
  });

  this.Then(/^I can add a related topic$/, function (callback) {
    NewTopicPage.clickAddRelatedTopic(callback);
  });

  this.Then(/^The count of the topics should be (\d+)$/, function (arg1, callback) {
    this.expect(NewTopicPage.countRelatedTopics()).to.eventually.equal(arg1).then(function() {
      callback();
    });
  });

  this.Then(/^I can remove a related topic$/, function (callback) {
    NewTopicPage.clickRemoveRelatedTopic('2', callback);
  });

  this.Then(/^I can type '(.+)' into the main search box to get a list of related topics$/, function(arg1, callback) {
    NewTopicPage.getRelatedTopics(arg1, callback);
  });

  this.Then(/^I can see the related topics of the first search result$/, function (callback) {
    NewTopicPage.viewFirstRelatedTopic(callback);
  });

  this.Then(/^I can select the first topic related to the first form result$/, function (callback) {
    NewTopicPage.selectFirstTopicInFirstForm(callback);
  });

  this.Then(/^The topic should appear in the related topics list$/, function (callback) {
    NewTopicPage.lastRelatedTopicShouldNotBeEmpty(callback);
    // utils.ensureElementValueNotEmpty('.related-concepts-item[index=1] > form > angucomplete-alt > .angucomplete-holder > input', callback);
  });
};

module.exports = myStepDefinitionsWrapper;
