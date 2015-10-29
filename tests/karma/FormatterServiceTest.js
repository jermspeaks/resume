/* jshint strict: false */

describe('FormatterService', function() {
	var FormatterService, rootScope;

	beforeEach(function() {
		module('topicGraphEditor');

		inject(function($injector, _$rootScope_) {
			FormatterService = $injector.get('FormatterService');
			rootScope = _$rootScope_;
		});
	});

	describe('parseUnicode()', function() {
    it('should unescape unicode embedded in a string', function() {
      var unescaped = '\u00C9omer';
      var unescaped2 = 'Canada\u2013South Korea relations';
			var unescaped3 = 'Castile and Le\u00F3n';
      expect(FormatterService.parseUnicode(unescaped)).toEqual('Éomer');
			expect(FormatterService.parseUnicode(unescaped2)).toEqual('Canada–South Korea relations');
			expect(FormatterService.parseUnicode(unescaped3)).toEqual('Castile and León');
    });
	});

	describe('generateWikipediaLink()', function() {
		it('convert a topic name to a proper wikipedia link', function() {
			var topicName = 'Christian Slater';
			expect(FormatterService.generateWikipediaLink(topicName)).toEqual('https://en.wikipedia.org/wiki/Christian_Slater');
		});

		it('convert a form name to a proper wikipedia link', function() {
			var formName = 'Failsafe (band)';
			expect(FormatterService.generateWikipediaLink(formName)).toEqual('https://en.wikipedia.org/wiki/Failsafe_(band)');
		});
	});

	describe('replaceSpaces()', function() {
		it('should replace spaces with underscores', function() {
			expect(FormatterService.replaceSpaces('Places and other places')).toEqual('Places_and_other_places');
		});
	});

	describe('calculatePercentage()', function() {
		it('should calculate percentage given decimal', function() {
			expect(FormatterService.calculatePercentage('0.045325784')).toEqual('5%');
		});
	});

});
