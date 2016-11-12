

angular.module('wikiSearch').service('wiki', function ($http) {

    var method = 'JSONP';
    var url = 'https://en.wikipedia.org//w/api.php?action=query&format=json&list=search&utf8=1&callback=JSON_CALLBACK&srsearch=';

    this.status = null;
    this.response = null;

    this.fetch = function(q) {

        return $http({method: method, url: url+q});
        /*
            .then(
            function(response) {
                this.status = response.status;
                this.data = response.data;
            },
            function(response) {
                this.status = response.status;
                this.data = response.data || "Request failed";
            });*/
    };


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

});

