/* jshint strict: false */

describe('TopicNewController', function() {
	var $scope, ctrl, state, $httpBackend;

	beforeEach(function() {
		module('topicGraphEditor');

		inject(function(_$rootScope_, _$controller_, _$state_, $injector) {
			$scope = _$rootScope_.$new();

			ctrl = _$controller_('TopicNewController', {
				$scope: $scope
			});

			state = _$state_;

			$httpBackend = $injector.get('$httpBackend');
		});
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('form', function() {
		it('should create a new form object', function() {
			expect($scope.form).toBeDefined();
			expect($scope.form.attributes.topicName).toBe('');
		});
	});

	describe('form.attributes.blocked', function() {
		it('should set a default blocked type to false', function() {
			expect(!!$scope.form.attributes.blocked).toEqual(false);
		});
	});

	describe('sideMenu', function() {
		it('should have side menu options', function() {
			expect($scope.sideMenu.length).toEqual(3);
			expect($scope.sideMenu[0].displayName).toEqual('Attributes');
			expect($scope.sideMenu[2].id).toEqual('search');
		});
	});

	describe('switchForm()', function() {
		it('should change the state', function() {
			expect(state.$current.name).toEqual('');
			$scope.switchForm('core.newTopic.forms');
			$scope.$digest(); // Need to digest $state.go();
			expect(state.$current.name).toEqual('core.newTopic.forms');
		});
	});

	describe('initialize', function() {
		it('should initialize the page to automatically go to the attributes page', function() {
			$scope.$digest();
			expect(state.$current.name).toEqual('core.newTopic.attrs');
		});
	});

	describe('addNetype()', function() {
		it('should initialize with no netypes', function() {
			expect($scope.form.attributes.netypes.length).toEqual(0);
		});

		it('should fail if no netype is added', function() {
			$scope.addNetype();
			expect($scope.form.attributes.netypes.length).toEqual(0);
		});

		it('should add a named entity type', function() {
			$scope.addNetype({
				title: 'sample'
			});

			expect($scope.form.attributes.netypes.length).toEqual(1);
			expect($scope.form.attributes.netypes).toEqual(['sample']);
		});

		it('should not add a duplicate entity type', function() {
			var sameObject = {
				title: 'sample'
			};

			// Try adding the same object twice
			$scope.addNetype(sameObject);
			$scope.addNetype(sameObject);

			expect($scope.form.attributes.netypes.length).toEqual(1);
		});
	});

	describe('deleteNetype()', function() {
		it('should delete a netype', function() {
			var sameObject = {
				title: 'sample'
			};

			$scope.addNetype(sameObject);

			expect($scope.form.attributes.netypes.length).toEqual(1);

			$scope.deleteNetype('sample');

			expect($scope.form.attributes.netypes.length).toEqual(0);
		});
	});

	describe('addRelatedTopic()', function() {
		it('should add a related topic', function() {
			var newTopic = {
				name: 'News'
			};

			$scope.addRelatedTopic(newTopic);

			expect($scope.form.relatedConcepts[0].name).toEqual(newTopic.name);
		});
	});

	describe('viewRelatedTopic()', function() {
		it('should view a related topic', function() {
			var viewTopic = {
				name: 'Sample'
			};

			var testData = {
				'name': 'Porteus Maze Test',
				'originalName': 'Porteus Maze Test',
				'isBlockListed': false,
				'sourceOfConcept': 'Graph',
				'id': '9125615',
				'netypes': [],
				'ils': ['Stanley Porteus', 'Vineland Training School', 'The Boston Process Approach'],
				'ols': ['Hawaii', 'Melbourne, Victoria', 'Australia'],
				'cs': ['Mazes', 'Intelligence tests', 'Cognitive tests'],
				'ilrels': [{
					'name': 'Vineland Training School',
					'score': 0.05882352963089943
				}, {
					'name': 'Stanley Porteus',
					'score': 0.1111111119389534
				}],
				'rels': [{
					'name': 'Stanley Porteus',
					'score': 0.4722222089767456
				}, {
					'name': 'Vineland Training School',
					'score': 0.24009603261947632
				}, {
					'name': 'Vineland, New Jersey',
					'score': 0.028625864535570145
				}],
				'forms': ['Porteus Maze Test (PMT)', 'Porteus Maze Test'],
				'formTopics': [{
					'formName': 'Porteus Maze Test (PMT)',
					'linkProbability': 1.0,
					'senseProbability': 1.0,
					'form': {
						'name': 'Porteus Maze Test (PMT)',
						'lp': 1.0,
						'tf': 1,
						'topics': [{
							'name': 'Porteus Maze Test',
							'sp': 1.0
						}]
					}
				}, {
					'formName': 'Porteus Maze Test',
					'linkProbability': 0.4000000059604645,
					'senseProbability': 1.0,
					'form': {
						'name': 'Porteus Maze Test',
						'lp': 0.4000000059604645,
						'tf': 10,
						'topics': [{
							'name': 'Porteus Maze Test',
							'sp': 1.0
						}]
					}
				}]
			};

			var path = $scope.apiRoot + '/topic?limit=1&skip=0&topicName=Sample';
			$httpBackend.when('GET', path).respond(testData);

			$scope.viewRelatedTopic(viewTopic);
			$httpBackend.flush();

			expect($scope.searchResults.formTopics.length).toEqual(2);
			expect($scope.searchResults.ilrels.length).toEqual(2);
			expect($scope.searchResults.rels.length).toEqual(3);
		});
	});

	describe('toggleFilterForm()', function() {
		it('should add the form to the filtered form list while removing it from the forms list', function() {
			$scope.filteredForms = [];
			$scope.toggleFilterForm('sample');
			expect($scope.filteredForms.length).toEqual(1);
			expect($scope.filteredForms).toEqual(['sample']);
		});
	});

	describe('toggleFilteredForms()', function() {
		it('should toggle the filtered forms on/off', function() {
			expect($scope.showFiltered).toBeUndefined();
			$scope.toggleFilteredForms();
			expect($scope.showFiltered).toBe(true);
		});
	});

	describe('submitNewConcept()', function() {
		it('should validate there is a concept', function() {
			expect($scope.form.attributes.topicName).toBe('');
			expect($scope.form.attributes.topicName.length).toEqual(0);
			expect(function() {
				$scope.submitNewConcept();
			}).toThrow(new Error('Form Invalid'));
		});

		it('should call the POST API path', function() {
			var path = $scope.apiRoot + '/topic';

			$httpBackend.when('POST', path).respond({
				success: true
			});

			$scope.form.attributes.topicName = 'Successful';
			$scope.submitNewConcept();

			// TODO something in the state will change here

			// Expectation is after submit new concept is in afterEach()
			$httpBackend.flush();
		});
	});
});
