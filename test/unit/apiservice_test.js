describe('Unit: apiService', function() {
  var apiService, $http , $httpBackend;
  beforeEach(module('app'));
	  beforeEach(module('appServices'));
	  
		  beforeEach(inject(function(_apiService_, _$http_ , $injector){
			$httpBackend = $injector.get('$httpBackend');
			$http = _$http_;
			apiService = _apiService_;

			$httpBackend.whenJSONP('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=wvnw24xfn5msywmrbv4c59v5&callback=JSON_CALLBACK&page=1&page_limit=30&q=spider')
				.respond ({movies:30, q : 'spider'});
		  }));

		  afterEach(function() {
			 $httpBackend.verifyNoOutstandingExpectation();
			 $httpBackend.verifyNoOutstandingRequest();
	   });

	  it("should check if apiService works",function(){
			apiService.searchMovies('spider',30,1).success(function(data){
				expect(data).toBeDefined();
			});
	  		$httpBackend.flush();
	  });
})