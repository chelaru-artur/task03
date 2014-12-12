var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
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

});


app.controller('MainController', ['apiService', '$scope', function(apiService, $scope) {
    $scope.list = "opening";
    $scope.query = "";

}]);

app.controller('MovieSearchCtrl', ['$scope', '$routeParams', 'apiService', function($scope, $routeParams, apiService) {

    apiService.searchMovies($routeParams.q, 30, 1).success(function(data) {
        $scope.movies = data;
    });
    $scope.getId = apiService.getId;

}]);

app.controller('MovieCtrl', ['$scope', '$routeParams', 'apiService', function($scope, $routeParams, apiService) {

    apiService.movie($routeParams.q).success(function(data) {
        $scope.movie = data;
        console.log($scope.movie);
    });

    apiService.similar($routeParams.q).success(function(data) {
        console.log(data);
        $scope.similar = data;
    });

    $scope.getId = apiService.getId;
}]);

app.controller('ListCtrl', ['$scope', '$routeParams', 'apiService', function($scope, $routeParams, apiService) {

    apiService.movieList($routeParams.q).success(function(data) {
        $scope.list = data;
    });
    $scope.getId = apiService.getId;

}]);



app.service('apiService', ['$http', function($http) {

    var apikey = 'wvnw24xfn5msywmrbv4c59v5';
    var jsonCallback = 'JSON_CALLBACK';

    this.searchMovies = function(q, page_limit, page, callback) {

        //   q			The plain text search query to search for a movie. Remember to URI encode this!
        // page_limit	 default : 30	The amount of movie search results to show per page
        // page	 default :	1	The selected page of movie search results

        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';

        var params = {
            'apikey': apikey,
            'q': q,
            'page_limit': page_limit,
            'page': page,
            'callback': jsonCallback
        };
        return get(url, params);
    };
    // acess any url that doesn't have arguments e.g : movie info, movie cast, reviews , etc
    this.movie = function(id) {
        var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/";
        var params = {
            'apikey': apikey,
            'callback': jsonCallback
        };
        return get(url + id, params);
    };

    // similar movies for chosen movie

    this.similar = function(q) {
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + q + '//similar.json';
        var params = {
            'apikey': apikey,
            'callback': jsonCallback
        };
        return get(url, params);
    };


    this.movieList = function(list) {
        var url = '';
        var params = {
            'apikey': apikey,
            'callback': jsonCallback
        };


        switch (list) {
            case 'box-office':
                url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json";
                break;
            case 'in_theaters':
                url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json";
                break;
            case 'opening':
                url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json";
                break;
            case 'upcoming':
                url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json";
                break;

        };
        return get(url, params);
    };

    this.getId = function(str) {
        var arr = str.split('/');
        return arr[arr.length - 1];
    };

    var get = function(url, params) {

        return $http.jsonp(url, {
            params: params
        })
    };



}]);