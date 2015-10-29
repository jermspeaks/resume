/* jshint strict: false */

describe('SelectedFormsFilter', function() {

  var $filter, allForms, selectedForms;

  beforeEach(function() {
		module('topicGraphEditor');

    inject(function(_$filter_){
      $filter = _$filter_;
    });

    allForms = [{
      formName: 'a'
    }, {
      formName: 'b'
    }, {
      formName: 'c'
    }];
    selectedForms = ['a'];
  });

  it('should reject the rejected forms from the main forms list', function() {
    var selectedFormsFilter = $filter('selectedFormsFilter');
    var filteredForms = selectedFormsFilter(allForms, selectedForms);

    expect(filteredForms.length).toEqual(2);
    expect(filteredForms[0].formName).toEqual('b');
  });
});
