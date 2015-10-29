/* jshint strict: false */

describe('FormEditController', function() {
	var $scope, ctrl, state, stateParams, $httpBackend,
		sampleForm = [{
			'name': 'The Mirror (Ja Rule Album)',
			'lp': 1.0,
			'tf': 1,
			'formTopics': [{
				'topicName': 'The Mirror (Ja Rule album)',
				'senseProbability': 1.0,
				'topic': {
					'name': 'The Mirror (Ja Rule album)',
					'originalName': 'The Mirror (Ja Rule album)',
					'isBlockListed': false,
					'sourceOfConcept': 'Graph',
					'id': '9034243',
					'netypes': ['InformationEntity', 'MusicalWork', 'Album', 'Work', 'MusicAlbum', 'CreativeWork', 'Q482994'],
					'ils': ['Mpire Music Group', '50 Cent', 'Ja Rule', 'Every Little Thing She Does Is Magic', 'Exodus (Ja Rule album)', 'The Game discography', 'Lil Wayne singles discography'],
					'ols': ['MTV News', 'Digital album', 'R.U.L.E.', '50 Cent', 'Entertainment Weekly', 'Ja Rule', 'XXL (magazine)', 'Icon (Ja Rule album)', 'Lil\' Wayne', 'Hip hop music'],
					'cs': ['Ja Rule albums', '2008 albums'],
					'ilrels': [{
						'name': 'Mpire Music Group',
						'score': 0.1111111119389534
					}, {
						'name': 'Exodus (Ja Rule album)',
						'score': 0.0714285746216774
					}, {
						'name': '50 Cent',
						'score': 0.001374570420011878
					}, {
						'name': 'Ja Rule',
						'score': 0.012345679104328156
					}],
					'rels': [{
						'name': 'Exodus (Ja Rule album)',
						'score': 0.7469388246536255
					}, {
						'name': 'R.U.L.E.',
						'score': 0.6775362491607666
					}],
					'forms': ['The Mirror', 'The Mirror (Ja Rule Album)', 'The Mirror (JaRule album)', 'The Mirror: Reloaded'],
					'formTopics': [{
						'formName': 'The Mirror',
						'linkProbability': 0.3340132534503937,
						'senseProbability': 0.01221374049782753,
						'form': {
							'name': 'The Mirror',
							'lp': 0.3340132534503937,
							'tf': 1961,
							'topics': [{
								'name': 'The Mirror (1915 film)',
								'sp': 0.0015267175622284412
							}, {
								'name': 'The Mirror (Spooky Tooth album)',
								'sp': 0.01221374049782753
							}]
						}
					}, {
						'formName': 'The Mirror (Ja Rule Album)',
						'linkProbability': 1.0,
						'senseProbability': 1.0,
						'form': {
							'name': 'The Mirror (Ja Rule Album)',
							'lp': 1.0,
							'tf': 1,
							'topics': [{
								'name': 'The Mirror (Ja Rule album)',
								'sp': 1.0
							}]
						}
					}, {
						'formName': 'The Mirror (JaRule album)',
						'linkProbability': 1.0,
						'senseProbability': 1.0,
						'form': {
							'name': 'The Mirror (JaRule album)',
							'lp': 1.0,
							'tf': 1,
							'topics': [{
								'name': 'The Mirror (Ja Rule album)',
								'sp': 1.0
							}]
						}
					}, {
						'formName': 'The Mirror: Reloaded',
						'linkProbability': 1.0,
						'senseProbability': 1.0,
						'form': {
							'name': 'The Mirror: Reloaded',
							'lp': 1.0,
							'tf': 1,
							'topics': [{
								'name': 'The Mirror (Ja Rule album)',
								'sp': 1.0
							}]
						}
					}]
				}
			}]
		}];

	describe('No State Initialization', function() {
		beforeEach(function() {
			module('topicGraphEditor');

			inject(function(_$rootScope_, _$controller_, _$state_) {
				$scope = _$rootScope_.$new();

				ctrl = _$controller_('FormEditController', {
					$scope: $scope
				});

				state = _$state_;
			});

		});

		describe('initialization', function() {
			it('should go back to search if no name given in params', function() {
				$scope.$digest();
				expect(state.current.name).toEqual('core.form');
				expect(state.current.controller).toEqual('FormSearchController');
			});
		});
	});

	describe('With State Initialization', function() {
		beforeEach(function() {
			module('topicGraphEditor');

			inject(function(_$rootScope_, _$controller_, _$state_, _$httpBackend_) {
				$scope = _$rootScope_.$new();
				stateParams = {
					formName: 'Ja Rule'
				};

				ctrl = _$controller_('FormEditController', {
					$scope: $scope,
					$stateParams: stateParams
				});

				state = _$state_;
				$httpBackend = _$httpBackend_;
			});

			var path = $scope.apiRoot + '/form/search?limit=1&searchString=Ja+Rule&skip=0';
			$httpBackend.when('GET', path).respond(sampleForm);

			$scope.$digest();
			$httpBackend.flush();
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should define the formName', function() {
			expect($scope.formModel.formName).toEqual('Ja Rule');
		});

		it('should load the data', function() {
			expect($scope.dataLoaded).toBe(true);
		});

		it('should add topics in formTopics', function() {
			expect($scope.formModel.topics.length).toEqual(1);
			expect($scope.formModel.topics[0].name).toEqual('The Mirror (Ja Rule album)');
		});

		describe('addBlankTopic()', function() {
			it('should be able to add a blank topic', function() {
				$scope.addBlankTopic();
				expect($scope.formModel.topics.length).toEqual(2);
				expect($scope.formModel.topics[1].senseProbability).toEqual(0);
				expect($scope.formModel.topics[1].name).toEqual('');
			});
		});

		describe('deleteInput()', function() {
			it('should be able to delete a topic', function() {
				$scope.addBlankTopic();
				expect($scope.formModel.topics.length).toEqual(2);
				$scope.deleteInput(0);
				expect($scope.formModel.topics[0].senseProbability).toEqual(0);
			});
		});

		describe('$on(Add Related Topic)', function() {
			it('should fill the blank input with the autocomplete name', function() {
				var response = {
					index: 1,
					name: 'Ja Rule'
				};

				$scope.addBlankTopic();
				$scope.$emit('Add Related Topics', response);

				expect($scope.formModel.topics[1].name).toEqual('Ja Rule');
			});
		});
	});
});
