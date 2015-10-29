/* jshint strict: false */

describe('LandingController', function() {
  var $scope, ctrl, state, $httpBackend;

  beforeEach(function (){
    module('topicGraphEditor');

    inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
      $scope = _$rootScope_.$new();

      state = {
        current: {
          url: '/'
        }
      };

      ctrl = _$controller_('LandingController', {
        $scope: $scope,
        $state: state
      });

      $httpBackend = _$httpBackend_;
    });

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('initialization', function() {
    beforeEach(function () {
      var path = $scope.apiRoot + '/graph/generate/status';
      $httpBackend.when('GET', path).respond(false);
    });

    describe('generateNewGraph()', function() {
      it('should be able to trigger a new graph generation', function() {
        var path = $scope.apiRoot + '/graph/generate';
        $httpBackend.when('POST', path).respond(true);

        $scope.generateNewGraph();

        $httpBackend.flush();

        expect($scope.graphGenerationStatus).toBe(true);
        expect($scope.graphMessage).toMatch(/Graph Generation has begun/);
      });
    });

    describe('editors', function() {
      it('should give 3 different editor settings', function() {
        expect($scope.model.editors.length).toEqual(3);
        expect($scope.model.editors[0].name).toEqual('create');
        expect($scope.model.editors[0].link).toEqual('core.newTopic');
      });
    });
  });

  describe('checkGraphGenerationStatus', function() {
    it('should fetch the graph generation status when service is not generating', function() {
      var path = $scope.apiRoot + '/graph/generate/status';
      $httpBackend.when('GET', path).respond(false);
      $scope.checkGraph();

      $scope.$digest();
      $httpBackend.flush();

      expect($scope.graphGenerationStatus).toBe(false);
    });

    it('should fetch the graph generation status when service is still generating', function() {
      var path = $scope.apiRoot + '/graph/generate/status';
      $httpBackend.when('GET', path).respond(true);

      $scope.checkGraph();

      $scope.$digest();
      $httpBackend.flush();

      expect($scope.graphGenerationStatus).toBe(true);
    });
  });

});
