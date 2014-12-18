describe('Unit: test MovieSearchCtrl', function() {
  var $httpBackend,$controller;
  beforeEach(module('app'));
	
		  beforeEach(inject(function(_apiService_, _$http_ , $injector ,_$controller_){
			$httpBackend = $injector.get('$httpBackend');
			$http = _$http_;
			$controller = _$controller_;

			$httpBackend.whenJSONP('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=wvnw24xfn5msywmrbv4c59v5&callback=JSON_CALLBACK&page=1&page_limit=30&q=batman')
				.respond ({movies:30});
		  }));

		  afterEach(function() {
			 $httpBackend.verifyNoOutstandingExpectation();
			 $httpBackend.verifyNoOutstandingRequest();
	   });

	  it("should check if movieSearchCtrl returns smth",function(){
			var scope = {};
		    var routeParams = {q: 'batman'};
		    var controller = $controller('MovieSearchCtrl',
				{
				$scope:scope ,
				$routeParams : routeParams
			});
		   $httpBackend.flush();
		   expect(scope.movies).toEqual({movies:30});
	  });
})