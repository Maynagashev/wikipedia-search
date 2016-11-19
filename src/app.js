/**
 * Created by https://github.com/maynagashev
 */



(function () {
    'use strict';
    angular
        .module('wikiSearch', ['ngMaterial', 'ngMessages'])
        .controller('MainController', MainController);


    function MainController (wiki, $scope, $compile, $timeout, $q, $log) {

        var self = this;

        self.simulateQuery = false;
        self.isDisabled    = false;

        // list of `state` value/display objects
        self.states        = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;

        self.newState = newState;

        function newState(state) {
            alert("Sorry! You'll need to create a Constitution for " + state + " first!");
        }


        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
            var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

            return allStates.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }









        $scope.errm = [];
        $scope.resultsFetched = false;
        $scope.query = '';
        $scope.results = [];
        $scope.perPage = 10;










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


/*
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
        });*/


    };
})();



