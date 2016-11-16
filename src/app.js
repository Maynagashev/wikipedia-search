/**
 * Created by https://github.com/maynagashev
 */

$("#search-input").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});



(function () {

    var app = angular.module('wikiSearch', []).run(function(){ console.log("Angular loaded."); });

    angular.module('wikiSearch').controller('MainController', ['wiki', '$scope', function (wiki, $scope){

        $scope.errm = [];
        $scope.resultsFetched = false;
        $scope.query = '';
        $scope.results = [];
        $scope.perPage = 10;

        //default search
        wiki.fetch('emma').then(function success(d) { showResults(d); });

        this.sendRequest = function () {
            if ($scope.query) {
                wiki.fetch($scope.query).then(function success(d) { showResults(d); });
            }
            else {
                $scope.errm.push('Empty query.');
            }
        }


        function showResults(d) {
            console.log(d);
            var results = [];
            if (d.data.hasOwnProperty('query')) {
                for (var k in d.data.query.pages) {
                    if (k.match(/\d+/)) {
                        results.push(d.data.query.pages[k]);
                    }
                }
            }


            $scope.pagination = pagination(results, $scope.perPage, 1);

            $scope.errm = [];
            var len = results.length;
            if (len > 0) {
                $scope.errm.push("Returned: " + len + " results.");
            }
            else {
                $scope.errm.push("Nothing found.");
            }
        }


        function pagination(items, perPage, curPage) {

            var pagesCount = Math.floor((items.length%perPage===0) ? items.length/perPage : items.length/perPage+1);
            curPage = (Number.isInteger(curPage) && curPage>=1 && curPage<=pagesCount) ? curPage : 1;

            var r = {
                curPage : curPage,
                start : curPage*perPage-perPage,
                finish : curPage*perPage-1,
                length : items.length,
                perPage : perPage,
                pagesCount : pagesCount,
                items : items,
                list : [],
                pages : []
            };

            r.list = r.items.slice(r.start,r.finish+1);
            for(var i=0; i<pagesCount; i++) { r.pages[i] = i+1; }

            console.log(r);
            return r;
        }

        this.showPage = function (page) {
            $scope.pagination = pagination($scope.pagination.items, $scope.perPage, page);
        };

    }]);
})();



