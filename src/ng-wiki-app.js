/**
 * Created by https://github.com/maynagashev on 02.11.2016.
 */

window.log = function() { return console.log.apply(console, arguments); };


(function () {

    var app = angular.module('wikiSearch', [])
        .run(function(){
            console.log("It's works.");
        });

    angular.module('wikiSearch').controller('MainController', ['wiki', '$scope', function (wiki, $scope){

        $scope.errm = [];
        $scope.resultsFetched = false;
        $scope.query = '';
        $scope.results = [];


        this.sendRequest = function ()
        {
            if ($scope.query) {
                wiki.fetch($scope.query).then(function (d) {
                    console.log(d);
                    showResults(d.data);
                },
                function (d) {
                    console.log(d);
                });

            }
            else {
                $scope.errm.push('Empty query.');
            }
            function showResults(d) {
                $scope.errm = [];
                $scope.results = d.query.search;

                var len = d.query.search.length;
                if (len > 0) {
                    $scope.errm.push("Returned: " + len + " results.");
                }
                else {
                    $scope.errm.push("Nothing found.");
                }
            }
        }

        this.updateErrm = function () {
            console.log("method invoked!");
        };

    }]);
})();



