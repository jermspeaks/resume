'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

module.exports = function() {
    var expect = chai.expect;
    return {
        /**
         * Click on the attributes tab
         * @param  {Function} callback Termination Function
         */
        clickAttributesTab: function(callback) {
            return element(by.id('side-menu-attrs')).click().then(function() {
              if (callback) {
                callback();
              }
            });
        },
        /**
         * Click on the forms tab
         * @param  {Function} callback Termination Function
         */
        clickFormsTab: function(callback) {
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
        clickSearchTab: function(callback) {
            return element(by.id('side-menu-search')).click().then(function() {
              if (callback) {
                callback();
              }
            });
        },
        /**
         * Type in the name of the topic
         * @param  {string}     name        Name of the topic
         */
        typeTopicName: function(name, callback) {
            return element(by.id('new-topic-name-input')).sendKeys(name).then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        typeOriginalName: function(originalName, callback) {
            return element(by.id('new-topic-original-name')).sendKeys(originalName).then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        toggleBlockListed: function(callback) {
            return element(by.css('#block-listed-toggle')).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        enterNewCategory: function(category, callback) {
            element(by.id('categories-tag_tag')).sendKeys(category);
            return element(by.id('categories-tag_tag')).sendKeys(protractor.Key.ENTER).then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        enterNewNamedEntityType: function(netype, callback) {
            return element(by.id('netype-autocomplete_value')).sendKeys(netype).then(function() {
                return element.all(by.css('.angucomplete-row')).first().click().then(function() {
                    if (callback) {
                        callback();
                    }
                });
            });
        },
        clickFormToggle: function(callback) {
            return element(by.css('.related-forms-caret-down')).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        enterLinkProbability: function(number, index, callback) {
            if (!index) {
                index = '1';
            }
            return element(by.id('form-link-probability-' + index)).sendKeys(number).then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        enterSenseProbability: function(number, index, callback) {
            if (!index) {
                index = '1';
            }
            return element(by.id('form-sense-probability-' + index)).sendKeys(number).then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        clickAddForm: function(index, callback) {
            if (!index) {
                index = '1';
            }
            return element(by.id('add-form-button-' + index)).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        enterFormName: function(name, index, callback) {
            if (!index) {
                index = '1';
            }
            return element(by.id('form-block-' + index)).sendKeys(name).then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        countForms: function() {
            return element.all(by.repeater('form.forms')).count().then(function(quantity) {
                return quantity.toString();
            });
        },
        clickRemoveForm: function(index, callback) {
            if (!index) {
                index = '2';
            }
            return element(by.id('delete-form-button-' + index)).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        clickAddRelatedTopic: function(callback) {
            return element(by.id('add-related-concept-button')).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        countRelatedTopics: function() {
            return element.all(by.repeater('form.relatedConcepts')).count().then(function(quantity) {
                return quantity.toString();
            });
        },
        clickRemoveRelatedTopic: function (index, callback) {
            if (!index) {
                index = '1';
            }
            return element(by.id('delete-related-concept-button-' + index)).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        },
        getRelatedTopics: function (topic, callback) {
            return element(by.css('.search-bar > #search-autocomplete > .angucomplete-holder > #search-autocomplete_value')).sendKeys(topic).then(function(){
				return element(by.css('.search-bar > #search-autocomplete > .angucomplete-holder > #search-autocomplete_value')).sendKeys(protractor.Key.ENTER).then(function() {
					if (callback) {
						callback();
					}
				});
			});
        },
        viewFirstRelatedTopic: function (callback) {
            return element.all(by.repeater('topic in searchResultsList')).get(0).element(by.css('.search-list-view-topic')).click().then(function() {
              if (callback) {
                callback();
              }
            });
        },
        selectFirstTopicInFirstForm: function (callback) {
            return element.all(by.repeater('formTopic in searchResults.formTopics')).each(function(elem) {
                elem.all(by.repeater('topic in formTopic.form.topics')).get(0).element(by.css('.topic-tag')).click().then(function() {
                  if (callback) {
                    callback();
                  }
                });
            });
        },
        lastRelatedTopicShouldNotBeEmpty: function(callback) {
            return element.all(by.css('.related-concepts-item > form > angucomplete-alt > .angucomplete-holder > input')).last().getAttribute('value').then(function(value) {
    			return expect(value).to.have.length.above(0);
            }).then(function() {
                if (callback) {
                    callback();
                }
            });
        }
    };

};
