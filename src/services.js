

angular.module('wikiSearch').service('wiki', function ($http, $log) {

    var limit = 500;
    var qs = {
        prefix: [
            "format=json",
            "generator=prefixsearch",
            "prop=pageprops%7Cpageimages%7Cpageterms",
            "ppprop=displaytitle",
            "piprop=thumbnail",
            "pithumbsize=80",
            "pilimit=" + limit,
            "wbptterms=description",
            "gpsnamespace=0",
            "gpslimit=" + limit,
            "gpssearch="
        ],

        fulltext: [
            "format=json",
            "list=search",
            "utf8=1",
            "srlimit=50",
            "srsearch="
        ]
    };

    var currentQuery = 'fulltext';




    this.status = null;
    this.response = null;

    this.fetch = function(q) {
        var url = 'https://en.wikipedia.org//w/api.php?action=query&callback=JSON_CALLBACK&'+qs[currentQuery].join('&')+q;
        console.log(url);
        return $http({
            method: 'jsonp',
            url: url
        });
    };

    this.parse = function (d) {
        console.log(d);
        var results = [];
        switch (currentQuery) {
            case 'fulltext':
                    results = d.data.query.search;
                break;
            case 'prefix':
                if (d.data.hasOwnProperty('query')) {
                    for (var k in d.data.query.pages) {
                        if (k.match(/\d+/)) {
                            results.push(d.data.query.pages[k]);
                        }
                    }
                }
                break;
        }

        return results;
    }

    this.autocomplete = function(text) {
        var url = "http://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=opensearch&format=json&search="+text;
        return $http.jsonp(url).then(function (response) {
            $log.info(response);
            return response.data[1].map(function (d) {
                return {
                    value: d,
                    display: d
                };
            });
        });
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

