/* jshint strict: false */

describe('FormService', function() {
  var $scope, form, FormService;

  beforeEach(function (){
    module('topicGraphEditor');

    inject(function(_$rootScope_, $injector) {
      $scope = _$rootScope_.$new();

      FormService = $injector.get('FormService');
    });

    form = new FormService();
  });

  describe('attributes', function() {
    it('should have default attributes', function() {
      expect(form.attributes.topicName).toEqual('');
    });

    it('should not be blocked by default', function() {
      expect(form.attributes.blocked).toBeUndefined();
    });
  });

  describe('forms', function() {
    it('should have a default form', function() {
      expect(form.forms.length).toEqual(1);
      expect(form.forms[0].tag).toEqual('default');
    });
  });

  describe('relatedConcepts', function() {
    it('should have a default relatedConcepts', function() {
      expect(form.relatedConcepts.length).toEqual(0);
    });
  });

  describe('addForm()', function() {
    it('should add a form', function() {
      form.addForm();
      expect(form.forms.length).toEqual(2);

      for (var i = 0; i < 3; i++) {
        form.addForm();
      }

      expect(form.forms.length).toEqual(5);
    });
  });

  describe('deleteForm()', function() {
    it('should delete a form', function() {
      // Add new Form with Hashkey
      form.addForm();
      form.forms[1].$$hashKey = 1;
      var newForm = form.forms[1];

      expect(form.forms.length).toEqual(2);
      expect(form.forms[1].$$hashKey).toEqual(1);

      // Delete that new form
      form.deleteForm(newForm);

      expect(form.forms.length).toEqual(1);
    });
  });

  describe('addConcept()', function() {
    it('should add a topic', function() {
      form.addConcept();
      expect(form.relatedConcepts.length).toEqual(1);

      for (var i = 0; i < 3; i++) {
        form.addConcept();
      }

      expect(form.relatedConcepts.length).toEqual(4);
      expect(form.relatedConcepts[0].name).toBeUndefined();
    });
    it('should add a topic with a topic name', function() {
      form.addConcept('Sample Topic');
      expect(form.relatedConcepts[0].name).toEqual('Sample Topic');
    });
  });

  describe('deleteConcept()', function() {
    it('should delete a topic', function() {
      // Add new Form with Hashkey
      form.addConcept();
      form.addConcept();
      form.relatedConcepts[1].$$hashKey = 1;
      var newConcept = form.relatedConcepts[1];

      expect(form.relatedConcepts.length).toEqual(2);
      expect(form.relatedConcepts[1].$$hashKey).toEqual(1);

      // Delete that new form
      form.deleteConcept(newConcept);

      expect(form.relatedConcepts.length).toEqual(1);
    });
  });

  describe('createSubmissionObject()', function() {
    it('should create a valid submission object', function() {
      form.attributes = {
        topicName: 'sample',
        originalName: 'sample original',
        netypes: ['SampleType'],
        blocked: false,
        categories: [{
          name: 'sample category'
        }]
      };

      form.relatedConcepts = [{
        name: 'Concept Sample'
      }];

      form.forms = [{
        name: 'Form Sample'
      }];
      var testObject = form.createSubmissionObject();
      expect(testObject.isBlockListed).toEqual(false);
      expect(testObject.netypes.length).toEqual(1);
      expect(testObject.relatedTopics[0].name).toEqual('Concept Sample');
      expect(testObject.forms).toEqual(['Form Sample']);
    });

    it('should create a valid submission object with just the name', function() {
      form.attributes.topicName = 'Single Name';

      expect(form.forms[0]).toBeDefined();
      form.forms[0].name = form.attributes.topicName;

      var testObject = form.createSubmissionObject();
      expect(testObject.name).toEqual('Single Name');
      expect(testObject.netypes.length).toEqual(0);
      expect(testObject.relatedTopics.length).toEqual(0);
      expect(testObject.forms.length).toEqual(1);
      expect(testObject.forms[0]).toEqual('Single Name');
    });
  });

});
