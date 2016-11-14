/**
 * Created by https://github.com/maynagashev
 */

(function () {

    var app = angular.module('wikiSearch', []).run(function(){ console.log("Angular loaded."); });

    angular.module('wikiSearch').controller('MainController', ['wiki', '$scope', function (wiki, $scope){

        $scope.errm = [];
        $scope.resultsFetched = false;
        $scope.query = '';
        $scope.results = [];


        this.sendRequest = function () {
            if ($scope.query) {
                wiki.fetch($scope.query).then(function success(d) { showResults(d.data.query.search); });
            }
            else {
                $scope.errm.push('Empty query.');
            }
        }


        function showResults(results) {




            $scope.pagination = pagination(results, 10, 1);
            console.log($scope.pagination);


            $scope.errm = [];
            var len = results.length;
            if (len > 0) {
                $scope.errm.push("Returned: " + len + " results.");
            }
            else {
                $scope.errm.push("Nothing found.");
            }
        }

        /**
         *
         * @param perPage
         * @param curPage
         */
        function pagination(items, perPage, curPage) {

            var start = 0,
                finish = 10;

            return {
                length : items.length,
                perPage : perPage,
                curPage : curPage,
                list : items,
                sliced_list : items.slice(start,finish)
            };
        }

        // future issue
        this.updateErrm = function () {
            console.log("method invoked!");
        };

    }]);
})();



