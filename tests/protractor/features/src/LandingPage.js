'use strict';

// var utils = require('./Utils')();

module.exports = function() {
    return {
        getMenuCount: function () {
            return element.all(by.repeater('edit in model.editors')).count();
        },
        clickMainHeader: function(callback) {
            return element(by.css('.main-header-title')).click().then(function() {
                if (callback) {
                    callback();
                }
            });
        }
    };

};
