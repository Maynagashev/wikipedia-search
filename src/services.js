

angular.module('wikiSearch').service('wiki', function ($http) {

    var method = 'JSONP';
    var limit = 500;
    var p = [
        "format=json",
        "generator=prefixsearch",
        "prop=pageprops%7Cpageimages%7Cpageterms",
        "ppprop=displaytitle",
        "piprop=thumbnail",
        "pithumbsize=80",
        "pilimit="+limit,
        "wbptterms=description",
        "gpsnamespace=0",
        "gpslimit="+limit
    ];

    var url = 'https://en.wikipedia.org//w/api.php?action=query&'+p.join('&')+'&callback=JSON_CALLBACK&gpssearch=';
    console.log(url);

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
     fulltext search
     var url = 'https://en.wikipedia.org//w/api.php?action=query&format=json&list=search&utf8=1&callback=JSON_CALLBACK&srsearch=';


    prefixes url:

     https://en.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&prop=pageprops%7Cpageimages%7Cpageterms&redirects=&ppprop=displaytitle&piprop=thumbnail&pithumbsize=80&pilimit=6&wbptterms=description&gpssearch=emma&gpsnamespace=0&gpslimit=6&callback=callbackStack.queue%5B9%5D

     api.php?
     action=query&
     format=json&
     generator=prefixsearch&
     prop=pageprops%7Cpageimages%7Cpageterms&
     redirects=&
     ppprop=displaytitle&
     piprop=thumbnail&
     pithumbsize=80&
     pilimit=6&
     wbptterms=description&
     gpssearch=emma&
     gpsnamespace=0&
     gpslimit=6&
     callback=callbackStack.queue%5B9%5D

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

