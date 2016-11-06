/**
 * Created by https://github.com/maynagashev on 02.11.2016.
 */
(function () {

    var app = angular.module('wikiSearch', [])
        .run(function(){
            console.log("It's works.");
        });

    app.controller('MainController', ['$http', '$scope', function ($http, $scope){
        $scope.resultsFetched = false;
        $scope.query = '';
        $scope.results = [
/*
            {
                "ns": 0,
                "title": "Albert Einstein",
                "snippet": "&quot;<span class=\"searchmatch\">Einstein</span>&quot; redirects here. For other uses, see <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (disambiguation) and <span class=\"searchmatch\">Einstein</span> (disambiguation). <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (/ˈaɪnstaɪn/; German: [ˈalbɛɐ̯t",
                "size": 137407,
                "wordcount": 14689,
                "timestamp": "2016-10-30T11:58:09Z"
            }
*/

        ];

        this.sendRequest = function () {
            if ($scope.query) {
                $http.jsonp('https://en.wikipedia.org//w/api.php?action=query&format=json&list=search&utf8=1&callback=JSON_CALLBACK&srsearch=' + $scope.query)
                    .success(function mycb(data) {
                        console.log(data);
                        showResults(data);

                    });
            }
            else {
                console.log('empty query');
            }
        };

        function showResults(d) {
            $scope.results = d.query.search;
            $scope.resultsFetched = true;
            console.log(this.results);

        }

        /*
         "ns": 0,
         "title": "Albert Einstein",
         "snippet": "&quot;<span class=\"searchmatch\">Einstein</span>&quot; redirects here. For other uses, see <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (disambiguation) and <span class=\"searchmatch\">Einstein</span> (disambiguation). <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (/ˈaɪnstaɪn/; German: [ˈalbɛɐ̯t",
         "size": 137407,
         "wordcount": 14689,
         "timestamp": "2016-10-30T11:58:09Z"
         */

    }]);


})();