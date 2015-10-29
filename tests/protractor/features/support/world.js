'use strict';

// var _ = require('lodash');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

module.exports = function () {

    this.World = function World(callback) {
        this.expect = chai.expect;

        this.loadTopicGraph = function() {
            return browser.get('/');
        };

        this.getCurrentUrl = function() {
            return browser.getCurrentUrl();
        };

        // this.signOut = function () {
        //     return element(by.css('.logout-link')).click();
        // };

        this.getPageTitle = function () {
            return browser.getTitle();
        };

        callback();
    };
};
