/**
 * Created by https://github.com/maynagashev
 */



(function () {
    'use strict';
    angular
        .module('wikiSearch', ['ngMaterial', 'ngMessages'])
        .controller('MainController', MainController);


    function MainController (wiki, $scope) {

        var self = this;

        $scope.searchText = '';
        $scope.autocomplete = wiki.autocomplete;


        $scope.errm = [];
        $scope.resultsFetched = false;

        $scope.results = [];
        $scope.perPage = 5;

        //default search
        wiki.fetch('emma').then(function success(d) { var ar = wiki.parse(d); showResults(ar); });

        // submit
        this.submit = function () {
            if ($scope.query) {
                wiki.fetch($scope.query).then(function success(d) {  var ar = wiki.parse(d); showResults(ar); });
            }
            else {
                $scope.errm.push('Empty query.');
            }
        }


        function showResults(results) {
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

    }
})();



