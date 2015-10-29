'use strict';

// var Chance = require('chance');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

module.exports = function() {
	var expect = chai.expect;

	/**
	 * Get the page's title text
	 * @return {string} Page Title Text
	 */
	function getPageTitle() {
		return browser.getTitle();
	}

	/**
	 * Waits for browser to find element by criteria
	 * @param  {function} criteria Criteria to find element
	 * @return {element}           Located Element by Criteria
	 */
	function locateElement(criteria) {
		return browser.wait(function() {
			return element(criteria).isPresent();
		}).then(function() {
			return element(criteria);
		});
	}

	/**
	 * Ensure element exists
	 * @param  {string}     cssClass    CSS class of element
	 * @param  {function}   callback    Termination function
	 * @return {expectation}            Test result
	 */
	function ensureElementIsPresent(cssClass, callback) {
		return expect(element(by.css(cssClass)).isPresent()).to.eventually.equal(true).then(function() {
			if (callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure element does not exist
	 * @param  {string}     cssSelector CSS selector of element
	 * @param  {function}   callback    Termination function
	 * @return {expectation}            Test result
	 */
	function ensureElementIsNotPresent(cssSelector, callback) {
		return expect(element(by.css(cssSelector)).isPresent()).to.eventually.equal(false).then(function() {
			if (callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure element text equals expected text
	 * @param  {string}   cssSelector 	CSS selector of element
	 * @param  {string}   expectedText  Expected text inside the element
	 * @param  {Function} callback 			Termination Function
	 * @return {expectation}            Test result
	 */
	function ensureElementText(cssSelector, expectedText, callback) {
		return expect(element(by.css(cssSelector)).getText()).to.eventually.equal(expectedText).then(function() {
			if (callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure element text contains expected text
	 * @param  {string}   cssSelector 	CSS selector of element
	 * @param  {string}   expectedText  Expected text inside the element
	 * @param  {Function} callback 			Termination Function
	 * @return {expectation}            Test result
	 */
	function ensureElementContainsText(cssSelector, expectedText, callback) {
		return expect(element(by.css(cssSelector)).getText()).to.eventually.contain(expectedText).then(function() {
			if (callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure element contains expected class
	 * @param  {string}   cssSelector   CSS selector of element
	 * @param  {string}   expectedClass Expected class CSS selector should have
	 * @param  {Function} callback      Termination Function
	 * @return {expectation}            Test result
	 */
	function ensureElementContainsClass(cssSelector, expectedClass, callback) {
		return expect(element(by.css(cssSelector)).getAttribute('class')).to.eventually.contain('active').then(function() {
			if (callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure Number of elements is as expected
	 * @param  {string}   cssSelector    CSS selector of element
	 * @param  {number}   expectedNumber Number of expected elements
	 * @param  {Function} callback       Termination Function
	 * @return {expectation}             Test result
	 */
	function ensureNumberOfElements(cssSelector, expectedNumber, callback) {
		return expect(element.all(by.css(cssSelector)).count()).to.eventually.equal(expectedNumber).then(function() {
			if(callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure Number of repeats is as expected
	 * @param  {string}   repeater	 	   Repeater selector
	 * @param  {number}   expectedNumber Number of expected elements
	 * @param  {Function} callback       Termination Function
	 * @return {expectation}             Test result
	 */
	function ensureNumberOfRepeats(repeater, expectedNumber, callback) {
		return expect(element.all(by.repeater(repeater)).count()).to.eventually.equal(expectedNumber).then(function() {
			if(callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure There are Repeats on Page
	 * @param  {string}   repeater	 	   Repeater selector
	 * @param  {Function} callback       Termination Function
	 * @return {expectation}             Test result
	 */
	function ensureRepeatsExists(repeater, callback) {
		return expect(element.all(by.repeater(repeater)).count()).to.eventually.be.above(0).then(function() {
			if (callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure element text contains expected text
	 * @param  {string}   cssSelector 	CSS selector of element
	 * @param  {string}   expectedValue Expected value of element
	 * @param  {Function} callback 			Termination Function
	 * @return {expectation}            Test result
	 */
	function ensureElementValue(cssSelector, expectedValue, callback) {
		return expect(element(by.css(cssSelector)).getAttribute('value')).to.eventually.equal(expectedValue).then(function() {
			if (callback) {
				callback();
			}
		});
	}

	/**
	 * Ensure element text is not an empty string
	 * @param  {string}   cssSelector 	CSS selector of element
	 * @return {expectation}            Test result
	 */
	function ensureElementValueNotEmpty(cssSelector) {
		return element(by.css(cssSelector)).getAttribute('value').then(function(value) {
			return expect(value).to.have.length.above(0);
		});
	}

	return {
		getPageTitle: getPageTitle,
		locateElement: locateElement,
		ensureElementIsPresent: ensureElementIsPresent,
		ensureElementIsNotPresent: ensureElementIsNotPresent,
		ensureElementText: ensureElementText,
		ensureElementContainsText: ensureElementContainsText,
		ensureElementContainsClass: ensureElementContainsClass,
		ensureNumberOfElements: ensureNumberOfElements,
		ensureNumberOfRepeats: ensureNumberOfRepeats,
		ensureRepeatsExists: ensureRepeatsExists,
		ensureElementValue: ensureElementValue,
		ensureElementValueNotEmpty: ensureElementValueNotEmpty
	};
};
