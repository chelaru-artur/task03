var app = angular.module('app', ['ngRoute','appControllers','appServices']);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when('/search/:q', {
            templateUrl: 'partials/search.html',
            controller: 'MovieSearchCtrl'
        })
        .when('/movie/:q', {
            templateUrl: 'partials/movie.html',
            controller: 'MovieCtrl'
        })
        .when('/list/:q', {
            templateUrl: 'partials/lists.html',
            controller: 'ListCtrl'
        });

}]);


app.constant('JSON_CALLBACK', 'JSON_CALLBACK');
app.constant('API_KEY','wvnw24xfn5msywmrbv4c59v5');


angular.module('appControllers',[]);

angular.module('appControllers').controller('MainController',  ["apiService", "$scope", function(apiService, $scope) {
    $scope.list = "opening";
    $scope.query = "";

}]);

angular.module('appControllers').controller('MovieSearchCtrl',  ["$scope", "$routeParams", "apiService", function($scope, $routeParams, apiService) {

    apiService.searchMovies($routeParams.q, 30, 1).success(function(data) {
        console.log(data);
        $scope.movies = data;
    });
    $scope.getId = apiService.getId;

}]);

angular.module('appControllers').controller('MovieCtrl', ["$scope", "$routeParams", "apiService", function($scope, $routeParams, apiService) {

    apiService.movie($routeParams.q).success(function(data) {
        $scope.movie = data;
        console.log($scope.movie);
    });

    apiService.similar($routeParams.q).success(function(data) {
        $scope.similar = data;
    });

    $scope.getId = apiService.getId;
}]);

angular.module('appControllers').controller('ListCtrl', ["$scope", "$routeParams", "apiService", function($scope, $routeParams, apiService) {

    apiService.movieList($routeParams.q).success(function(data) {
        $scope.list = data;
    });
    $scope.getId = apiService.getId;

}]);


angular.module('appServices',[]);


angular.module('appServices').service('apiService', ["$http", "JSON_CALLBACK", "API_KEY", function($http , JSON_CALLBACK, API_KEY) {

    this.searchMovies = function(q, page_limit, page) {
        //   q			The plain text search query to search for a movie. Remember to URI encode this!
        // page_limit	 default : 30	The amount of movie search results to show per page
        // page	 default :	1	The selected page of movie search results
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
        var params = {
            'q' : q,
            'page_limit': page_limit,
            'page': page
        };
        return get(url, params);
    };

    this.movie = function(id) {
        var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/";

        return get(url + id);
    };

    // similar movies for chosen movie
    this.similar = function(q) {
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + q + '/similar.json';

        return get(url);
    };


    this.movieList = function(list) {
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/' + list;
        return get(url);
    };

    this.getId = function(str) {
        var arr = str.split('/');
        return arr[arr.length - 1];
    };

    var get = function(url, params) {
        // parameters are divided because callback parameter must be last in parameters list
        var key = {
            'apikey': API_KEY
        };
        var callback = {
            'callback': JSON_CALLBACK
        };
        return $http.jsonp(url, {
            params: angular.extend(key,params,callback)
        });
    };

}]);

