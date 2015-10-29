'use strict';

var chai = require('chai');

module.exports = function() {
    var expect = chai.expect;
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
        selectFirstFormInList: function(callback) {
            return element.all(by.css('.form-topic-title')).get(0).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        /**
         * Tell the browser to go to a sepcific form view page
         * @param  {string}   form     Name of the form to be viewed
         * @param  {Function} callback  Termination Function
         */
        goToViewFormPage: function(form, callback) {
        	/**
        	 * Browser.get takes two parameters
        	 * @param  {string}   url     URL of the website
        	 * @param  {number}   delay   How long to delay after loading
        	 */
        	return browser.get('/#/form/view/' + encodeURIComponent(form), 1000).then(function() {
        		if (callback) {
        			callback();
        		}
        	});
        },
        clickEditFormPage: function(callback){
            return element(by.id('edit-form-topics-button')).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        addTopicToEdit: function(callback) {
            return element(by.id('add-new-topic-button')).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        /**
         * Checks the last topic to see if value is empty
         * @param  {Function} callback Termination function
         */
        checkEmptyLastTopic: function(callback) {
            return element.all(by.repeater('topic in formModel.topics')).last().element(by.id('search-autocomplete_value')).getAttribute('value').then(function(value) {
                return expect(value).to.have.length(0);
            }).then(function() {
                if (callback) {
                    callback();
                }
            });
        }
    };

};
