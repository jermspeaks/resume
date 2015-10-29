'use strict';

module.exports = function() {
    return {
        clickHome: function (callback) {
            return element(by.css('.main-header-title')).click().then(function() {
              if (callback) {
                callback();
              }
            });
        },
        clickNewTopic: function (callback) {
            return element(by.css('.main-menu-new-topic')).click().then(function() {
              if (callback) {
                callback();
              }
            });
        },
        clickSearchTopic: function (callback) {
            return element(by.css('.main-menu-search-topics')).click().then(function() {
              if (callback) {
                callback();
              }
            });
        },
        clickSearchForm: function (callback) {
            return element(by.css('.main-menu-search-forms')).click().then(function() {
              if (callback) {
                callback();
              }
            });
        }
    };

};
