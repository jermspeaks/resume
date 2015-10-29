/* jshint strict: false */

describe('TopicSearchController', function() {
	var $scope, ctrl, TopicSearchService, state;


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


  /**
   * Call topic delete spy and return message
   * @param  {string} message 	success message
   * @return {promise}        	Promise object
   */
  function callTopicDeleteSpy(message) {
  	return spyOn(TopicSearchService, 'deleteTopic').and.callFake(returnPromise(message).promiseFunction);
  }

	beforeEach(function() {
		module('topicGraphEditor');
	});

	beforeEach(function() {
		inject(function(_$rootScope_, _$controller_, $injector, _$state_) {
			$scope = _$rootScope_.$new();

			ctrl = _$controller_('TopicSearchController', {
				$scope: $scope
			});

			TopicSearchService = $injector.get('TopicSearchService');

			state = _$state_;
		});

	});

	it('should have a preset view navigation', function() {
		expect($scope.viewNavigation.length).toEqual(3);
		expect($scope.viewNavigation[0].id).toEqual('attrs');
	});

	describe('deleteTopic()', function() {
		it('should be able to delete a topic', function() {
			callTopicDeleteSpy('Topic Deleted');
			$scope.deleteTopic('sample topic name');
			expect(TopicSearchService.deleteTopic.calls.count()).toEqual(1);
		});

		it('should change the state if delete topic is successful', function() {
			callTopicDeleteSpy('Topic Deleted');
			$scope.deleteTopic('sample topic name');
			$scope.$digest();
			expect(state.current.name).toEqual('core.searchTopic');
		});
	});

	describe('switchView()', function() {
		it('should switch the navigation and partial', function() {
			var newView = 'core.searchTopic.view.topics';
			$scope.switchView(newView, 'topics');
			$scope.$digest();
			expect(state.current.name).toEqual(newView);
		});
	});

	describe('showMore()', function() {
		it('should increase the limits of the section id to its full content', function() {
			// Initiate sample data
			$scope.data = {
				sampleSection: new Array(45)
			};

			// Initiate limits
			$scope.limits = {
				sampleSection: 5
			};

			// call shore more
			$scope.showMore('sampleSection', {
				target: '<h1>sample</h1>'
			});

			expect($scope.limits.sampleSection).toEqual(46);
		});

		it('should increase the limits of the formTopics depending on its index', function() {
			// Initiate sample data
			$scope.data = {
				formTopics: [{
					'formName': 'Taken by Trees',
					'linkProbability': 0.7894737124443054,
					'senseProbability': 1.0,
					'form': {
						'name': 'Taken by Trees',
						'lp': 0.7894737124443054,
						'tf': 19,
						'topics': [{
							'name': 'Taken by Trees',
							'sp': 1.0
						}]
					}
				}, {
					'formName': 'Taken By Trees',
					'linkProbability': 0.8181818127632141,
					'senseProbability': 0.1111111119389534,
					'form': {
						'name': 'Taken By Trees',
						'lp': 0.8181818127632141,
						'tf': 11,
						'topics': [{
							'name': 'Taken by Trees',
							'sp': 0.1111111119389534
						}, {
							'name': 'Taken By Trees',
							'sp': 0.8888888955116272
						}]
					}
				}]
			};

			// Initiate limits for Form Topics
			$scope.limits = {
				formTopics: [1, 1]
			};

			// call shore more
			$scope.showMore('formTopics', {
				target: '<h1>sample</h1>'
			}, 1);

			expect($scope.limits.formTopics[1]).toEqual(2);
		});
	});

});
