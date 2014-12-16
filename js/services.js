
angular.module('appServices',[]);


angular.module('appServices').service('apiService', function($http , JSON_CALLBACK, API_KEY) {

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

});

