/**
 * Created by https://github.com/maynagashev on 02.11.2016.
 */
(function () {

    var app = angular.module('wiki-app', ['ngAnimate']);

    app.controller('wiki-api', ['$http', function ($http){
        $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&callback=JSON_CALLBACK')
            .success(function mycb(data) {
            console.log(data);
        });
    }]);


})();