'use strict';

// var utils = require('./Utils')();

module.exports = function() {
	return {
		/**
		 * Enter Search text in the search bar
		 * @param  {string}   search   search string to be input in the search bar
		 * @param  {Function} callback Termination Function
		 */
		enterSearchText: function(search, callback) {
			return element(by.css('#search-autocomplete_value')).sendKeys(search).then(function() {
				return element.all(by.css('.angucomplete-row')).first().click().then(function() {
					if (callback) {
						callback();
					}
				});
			});
		},
		/**
		 * Grabs a list of search results
		 * @param  {string}   search   search query
		 * @param  {Function} callback Termination Function
		 */
		getSearchList: function(search, callback) {
			return element(by.css('#search-autocomplete_value')).sendKeys(search).then(function(){
				return element(by.css('#search-autocomplete_value')).sendKeys(protractor.Key.ENTER).then(function() {
					if (callback) {
						callback();
					}
				});
			});
		},
		/**
		 * Tell the browser to go to a sepcific topic view page
		 * @param  {string}   topic     Name of the topic to be viewed
		 * @param  {Function} callback  Termination Function
		 */
		goToViewTopicPage: function(topic, callback) {
			/**
			 * Browser.get takes two parameters
			 * @param  {string}   url     URL of the website
			 * @param  {number}   delay   How long to delay after loading
			 */
			return browser.get('/#/topic/view/' + encodeURIComponent(topic), 1000).then(function() {
				if (callback) {
					callback();
				}
			});
		},
		/**
		 * Click on related topics tab
		 * @param  {Function} callback Termination Function
		 */
		clickRelatedTopics: function(callback) {
			return element(by.id('view-nav-topics')).click().then(function() {
				if (callback) {
					callback();
				}
			});
		},
		/**
		 * Click on the forms tab
		 * @param  {Function} callback Termination Function
		 */
		clickForms: function(callback) {
			return element(by.id('view-nav-forms')).click().then(function() {
				if (callback) {
					callback();
				}
			});
		},
		/**
		 * Go to the edit topic page
		 * @param  {Function} callback Termination Function
		 */
		goToEditTopicPage: function(callback) {
			return element(by.id('topic-view-action-edit')).click().then(function() {
				if (callback) {
					callback();
				}
			});
		},
		/**
		 * Click on the forms tab
		 * @param  {Function} callback Termination Function
		 */
		clickEditFormsTab: function(callback) {
			return element(by.id('side-menu-forms')).click().then(function() {
				if (callback) {
					callback();
				}
			});
		},
		/**
		 * Click on the search tab
		 * @param  {Function} callback Termination Function
		 */
		clickEditSearchTab: function(callback) {
			return element(by.id('side-menu-search')).click().then(function() {
				if (callback) {
					callback();
				}
			});
		}
	};
};
