/* jshint strict: false */

describe('TopicEditController', function() {
	var $scope, ctrl, state, stateParams, $httpBackend,
		sampleTopic = {
			name: 'Ja Rule',
			id: 3098497,
			originalName: 'Jeffrey Atkins',
			sourceOfConcept: 'Graph',
			isBlockListed: false,
			netypes: [
				'Person'
			],
			cs: [
				'African-American male actors',
				'African-American male rappers'
			],
			formTopics: [{
				formName: 'Ja Rule',
				linkProbability: 0.7,
				senseProbability: 0.75
			}, {
				formName: 'Jeffrey Atkins',
				linkProbability: 0.3,
				senseProbability: 0.25
			}],
			ilrels: [{
				name: 'DMX',
				score: 0.7
			}, {
				name: 'Wanessa',
				score: 0.69
			}, {
				name: 'Ashanti',
				score: 0.4
			}, {
				name: 'Mary J. Blige',
				score: 0.35
			}, {
				name: 'Irv Gotti',
				score: 0.23
			}, {
				name: 'Memphis Bleek',
				score: 0.21
			}, {
				name: 'Jay-Z',
				score: 0.05
			}, {
				name: 'Lil Mo',
				score: 0.005
			}]
		};

	describe('No State Initialization', function() {
		beforeEach(function() {
			module('topicGraphEditor');

			inject(function(_$rootScope_, _$controller_, _$state_) {
				$scope = _$rootScope_.$new();

				ctrl = _$controller_('TopicEditController', {
					$scope: $scope
				});

				state = _$state_;
			});

		});

		describe('initialization', function() {
			it('should go back to search if no name given in params', function() {
				$scope.$digest();
				expect(state.current.name).toEqual('core.searchTopic');
				expect(state.current.controller).toEqual('TopicSearchController');
			});
		});
	});

	describe('With State Initialization', function() {
		beforeEach(function() {
			module('topicGraphEditor');

			inject(function(_$rootScope_, _$controller_, _$state_, _$httpBackend_) {
				$scope = _$rootScope_.$new();
				stateParams = {
					name: 'Ja Rule'
				};

				ctrl = _$controller_('TopicEditController', {
					$scope: $scope,
					$stateParams: stateParams
				});

				state = _$state_;
				$httpBackend = _$httpBackend_;
			});

			var path = $scope.apiRoot + '/topic?limit=1&skip=0&topicName=Ja+Rule';
			$httpBackend.when('GET', path).respond(sampleTopic);

			// initialize controller
			$scope.$digest();
			$httpBackend.flush();
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		describe('initialization', function() {
			it('should initialize attributes (name)', function() {
				expect($scope.form.attributes.topicName).toEqual('Ja Rule');
			});

			it('should initialize attributes (id)', function() {
				expect($scope.form.attributes.id).toEqual(3098497);
			});

			it('should initialize attributes (originalName)', function() {
				expect($scope.form.attributes.originalName).toEqual('Jeffrey Atkins');
			});

			it('should initialize attributes (sourceOfConcept)', function() {
				expect($scope.form.attributes.sourceOfConcept).toEqual('Graph');
			});

			it('should initialize attributes (blocked)', function() {
				expect($scope.form.attributes.blocked).toBe(false);
			});

			it('should initialize attributes (categories)', function() {
				expect($scope.form.attributes.categories[0].name).toEqual('African-American male actors');
				expect($scope.form.attributes.categories.length).toEqual(2);
			});

			it('should initialize attributes (netype)', function() {
				expect($scope.form.attributes.netypes[0]).toEqual('Person');
				expect($scope.form.attributes.netypes.length).toEqual(1);
			});

			it('should initialize forms', function() {
				expect($scope.form.forms.length).toEqual(2);
				expect($scope.form.forms[1].linkProbability).toEqual(0.3);
				expect($scope.form.forms[0].id).toEqual('Form 1');
			});

			it('should initialize related topics', function() {
				expect($scope.form.relatedConcepts.length).toEqual(8);
				expect($scope.form.relatedConcepts[5].name).toEqual('Ashanti');
				expect($scope.form.relatedConcepts[3].id).toEqual('Form 4');
			});
		});

		describe('sideMenu', function() {
			it('should have side menu options', function() {
				expect($scope.sideMenu.length).toEqual(3);
				expect($scope.sideMenu[1].displayName).toEqual('Forms');
				expect($scope.sideMenu[2].partial).toEqual('core.editTopic.search');
			});
		});

		describe('switchForm()', function() {
			it('should change the state', function() {
				$scope.switchForm('core.editTopic.forms');
				$scope.$digest(); // Need to digest $state.go();
				expect(state.$current.name).toEqual('core.editTopic.forms');
			});
		});

		describe('addNetype()', function() {
			it('should fail if no netype is added', function() {
				$scope.addNetype();
				expect($scope.form.attributes.netypes.length).toEqual(1);
			});

			it('should add a named entity type', function() {
				$scope.addNetype({
					title: 'sample'
				});

				expect($scope.form.attributes.netypes.length).toEqual(2);
				expect($scope.form.attributes.netypes).toEqual(['Person', 'sample']);
			});

			it('should not add a duplicate entity type', function() {
				var sameObject = {
					title: 'sample'
				};

				// Try adding the same object twice
				$scope.addNetype(sameObject);
				$scope.addNetype(sameObject);

				expect($scope.form.attributes.netypes.length).toEqual(2);
			});
		});

		describe('deleteNetype()', function() {
			it('should delete a netype', function() {
				var sameObject = {
					title: 'sample'
				};

				$scope.addNetype(sameObject);

				expect($scope.form.attributes.netypes.length).toEqual(2);

				$scope.deleteNetype('sample');

				expect($scope.form.attributes.netypes.length).toEqual(1);
			});
		});

		describe('submitEditTopic()', function() {
			it('should submit an edit topic', function() {
				$scope.form.attributes.topicName = 'Successful';

				var path = $scope.apiRoot + '/topic';

				$httpBackend.when('PUT', path).respond({
					name: 'Successful'
				});

				$scope.submitEditTopic();
				$httpBackend.flush();

				// State should go back to viewing the topic
				expect(state.current.name).toEqual('core.searchTopic.view');
			});
		});
	});
});
