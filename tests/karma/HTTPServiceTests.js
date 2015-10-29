/* jshint strict: false */

describe('HttpService', function() {
	var HttpService, $httpBackend, rootScope;

	beforeEach(function() {
		module('topicGraphEditor');

		inject(function($injector, _$rootScope_) {
			HttpService = $injector.get('HttpService');
			$httpBackend = $injector.get('$httpBackend');
			rootScope = _$rootScope_;
		});
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('setApiRoot', function() {
		it('Should set the API root', function() {
			HttpService.setApiRoot('/api/v1');
			expect(rootScope.apiRoot).toEqual('/api/v1');
		});
	});

	describe('get()', function() {
		beforeEach(function() {
			HttpService.setApiRoot('');
		});

		it('Should make a GET request', function() {
			$httpBackend.expectGET('/pass').respond(200);

			HttpService.get('/pass');
			$httpBackend.flush();
		});

		it('Should make a GET request with query paramters', function() {
			$httpBackend.expectGET('/pass?Dummy_Parameter=true').respond(200);

			HttpService.get('/pass', {
				'Dummy_Parameter': 'true'
			});
			$httpBackend.flush();
		});
	});

	describe('post()', function() {
		beforeEach(function() {
			HttpService.setApiRoot('');
		});

		it('Should make a POST request', function() {
			$httpBackend.expectPOST('/pass').respond(200);

			HttpService.post('/pass');
			$httpBackend.flush();
		});

		it('Should make a POST request with post parameters', function() {
			$httpBackend.expectPOST('/pass', {
				'post_param': 'true'
			}).respond(200);

			HttpService.post('/pass', {
				'post_param': 'true'
			});
			$httpBackend.flush();
		});

		it('Should make a POST request with query parameters', function() {
			$httpBackend.expectPOST('/pass?guess=true').respond(200);

			HttpService.post('/pass', {}, {
				guess: true
			});
			$httpBackend.flush();
		});
	});

	describe('put()', function() {
		beforeEach(function() {
			HttpService.setApiRoot('');
		});

		it('Should make a PUT request', function() {
			$httpBackend.expectPUT('/pass').respond(200);

			HttpService.put('/pass');
			$httpBackend.flush();
		});

		it('Should make a PUT request with post parameters', function() {
			$httpBackend.expectPUT('/pass', {
				'post_param': 'true'
			}).respond(200);

			HttpService.put('/pass', {
				'post_param': 'true'
			});
			$httpBackend.flush();
		});

		it('Should make a PUT request with query parameters', function() {
			$httpBackend.expectPUT('/pass?guess=true').respond(200);

			HttpService.put('/pass', {}, {
				guess: true
			});
			$httpBackend.flush();
		});
	});

	describe('httpDelete()', function() {
		beforeEach(function() {
			HttpService.setApiRoot('');
		});

		it('Should make a DELETE request', function() {
			$httpBackend.expectDELETE('/pass').respond(200);

			HttpService.httpDelete('/pass');
			$httpBackend.flush();
		});

		it('Should make a DELETE request with query parameters', function() {
			$httpBackend.expectDELETE('/pass?guess=true').respond(200);

			HttpService.httpDelete('/pass', {}, {
				guess: true
			});
			$httpBackend.flush();
		});
	});

	describe('setParam()', function() {
		it('should set the params passed in', function() {
			var params = HttpService.setParam('glob');
			expect(params).toEqual('glob');
		});
	});

});
