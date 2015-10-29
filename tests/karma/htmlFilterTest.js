/* jshint strict: false */

describe('HTMLFilter', function() {

  var $filter;

  beforeEach(function() {
		module('topicGraphEditor');

    inject(function(_$filter_){
      $filter = _$filter_;
    });
  });

  it('should wrap the string as a safe trusted value', function() {
    var htmlFilter = $filter('htmlFilter');
    var string = '<h1>Hello Dolly</h1>';
    expect(htmlFilter(string).$$unwrapTrustedValue()).toEqual(string);
  });
});
