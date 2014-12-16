var app = angular.module('app', ['ngRoute','appControllers','appServices']);

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


app.constant('JSON_CALLBACK', 'JSON_CALLBACK');
app.constant('API_KEY','wvnw24xfn5msywmrbv4c59v5');

