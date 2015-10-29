/* jshint strict: false */

describe('FormSearchController', function() {
	var $scope, ctrl, FormSearchService, state, stateParams, $httpBackend;


	/**
	 * Returns a promise
	 * @param  {string} message string message
	 * @return {function}         promise function
	 */
	function returnPromise(message) {
		/**
		 * Returns a promise callback
		 * @return {[type]} [description]
		 */
		function promiseFunction() {
			var deferred;
			inject(function($q) {
				deferred = $q.defer();
				deferred.resolve(message);
			});
			return deferred.promise;
		}
		return {
			promiseFunction: promiseFunction
		};
	}

	beforeEach(function() {
		module('topicGraphEditor');
	});

	describe('No State Initialization', function() {
		beforeEach(function() {
			module('topicGraphEditor');

			inject(function(_$rootScope_, _$controller_, _$state_, _$stateParams_, _$httpBackend_) {
				$scope = _$rootScope_.$new();

				ctrl = _$controller_('FormSearchController', {
					$scope: $scope
				});

				state = _$state_;
				stateParams = _$stateParams_;
				$httpBackend = _$httpBackend_;
			});


			var path = $scope.apiRoot + '/form/search?limit=1&searchString=Sample+Form&skip=0';
			$httpBackend.when('GET', path).respond([{
				'name': 'string',
				'originalName': 'string',
				'lp': 0,
				'tf': 0,
				'topics': [{
					'name': 'string',
					'sp': 0
				}],
				'formTopics': [{
					'formName': 'string',
					'topicName': 'string',
					'linkProbability': 0,
					'senseProbability': 0,
					'form': {},
					'topic': {
						'name': 'string',
						'lastUpdated': 0,
						'forms': [
							'string'
						],
						'formTopics': [{}],
						'originalName': 'string',
						'isBlockListed': true,
						'sourceOfConcept': 'string',
						'id': 'string'
					}
				}]
			}]);
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		describe('initialization', function() {
			it('should go back to form search page if no form name given in params', function() {
				$scope.$digest();
				expect(state.current.name).toEqual('core.form');
			});
		});

		describe('$on(Form Search Results)', function() {

			it('should be able to give form results upon receiving an emit object', function() {
				var emitObject = {
					query: 'Sample Form',
					response: [{
						'name': 'string',
						'originalName': 'string',
						'lp': 0,
						'tf': 0,
						'topics': [{
							'name': 'string',
							'sp': 0
						}],
						'formTopics': [{
							'formName': 'string',
							'topicName': 'string',
							'linkProbability': 0,
							'senseProbability': 0,
							'form': {},
							'topic': {
								'name': 'string',
								'lastUpdated': 0,
								'forms': [
									'string'
								],
								'formTopics': [{}],
								'originalName': 'string',
								'isBlockListed': true,
								'sourceOfConcept': 'string',
								'id': 'string'
							}
						}]
					}]
				};

				$scope.$emit('Form Search Results', emitObject);

				expect($scope.formTitle).toEqual('Sample Form');
				expect($scope.results.formTopics.length).toEqual(1);
				expect($scope.results.formTopics[0].wikipediaLink).toEqual('https://en.wikipedia.org/wiki/string');

				$scope.$digest();
				expect(state.current.name).toEqual('core.form.view');
			});
		});

		describe('$on(Form Search List)', function() {
			it('should be able to give a list of possible forms upon receiving an emit object', function() {
				// Reset State Params
				stateParams.formName = '';
				$httpBackend.flush();

				var emitObject = {
					query: 'Test',
					response: [{
						'name': 'Turning Test'
					}, {
						'name': 'Youth Test'
					}, {
						'name': 'Alternative Testicles Records'
					}, {
						'name': 'Test cricketers'
					}, {
						'name': 'women\'s Test cricket'
					}, {
						'name': 'The New Testament (The Truth)'
					}, {
						'name': 'Baka and Test: Summon The Beast'
					}]
				};

				$scope.$emit('Form Search List', emitObject);

				expect($scope.searchQuery).toEqual('Test');
				expect($scope.model.result.length).toEqual(7);
				expect($scope.model.result[4].name).toEqual('women\'s Test cricket');

				$scope.$digest();
				expect(state.current.name).toEqual('core.form.list');
			});
		});
	});

	describe('State Initialization', function() {
		beforeEach(function() {
			module('topicGraphEditor');

			inject(function(_$rootScope_, _$controller_, _$state_, _$httpBackend_) {
				$scope = _$rootScope_.$new();

				stateParams = {
					formName: 'Sample Form'
				};

				ctrl = _$controller_('FormSearchController', {
					$scope: $scope,
					$stateParams: stateParams
				});

				state = _$state_;
				$httpBackend = _$httpBackend_;
			});


			var path = $scope.apiRoot + '/form/search?limit=1&searchString=Sample+Form&skip=0';
			$httpBackend.when('GET', path).respond([{
				'name': 'string',
				'originalName': 'string',
				'lp': 0,
				'tf': 0,
				'topics': [{
					'name': 'string',
					'sp': 0
				}],
				'formTopics': [{
					'formName': 'string',
					'topicName': 'string',
					'linkProbability': 0,
					'senseProbability': 0,
					'form': {},
					'topic': {
						'name': 'string',
						'lastUpdated': 0,
						'forms': [
							'string'
						],
						'formTopics': [{}],
						'originalName': 'string',
						'isBlockListed': true,
						'sourceOfConcept': 'string',
						'id': 'string'
					}
				}]
			}]);
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should be able to give form results', function() {
			$scope.$digest();
			$httpBackend.flush();

			expect(state.current.name).toEqual('core.form.view');
			expect($scope.formTitle).toEqual('Sample Form');
			expect($scope.results.formTopics.length).toEqual(1);
		});
	});

});
