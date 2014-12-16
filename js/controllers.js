angular.module('appControllers',[]);

angular.module('appControllers').controller('MainController',  function(apiService, $scope) {
    $scope.list = "opening";
    $scope.query = "";

});

angular.module('appControllers').controller('MovieSearchCtrl',  function($scope, $routeParams, apiService) {

    apiService.searchMovies($routeParams.q, 30, 1).success(function(data) {
        console.log(data);
        $scope.movies = data;
    });
    $scope.getId = apiService.getId;

});

angular.module('appControllers').controller('MovieCtrl', function($scope, $routeParams, apiService) {

    apiService.movie($routeParams.q).success(function(data) {
        $scope.movie = data;
        console.log($scope.movie);
    });

    apiService.similar($routeParams.q).success(function(data) {
        $scope.similar = data;
    });

    $scope.getId = apiService.getId;
});

angular.module('appControllers').controller('ListCtrl', function($scope, $routeParams, apiService) {

    apiService.movieList($routeParams.q).success(function(data) {
        $scope.list = data;
    });
    $scope.getId = apiService.getId;

});
