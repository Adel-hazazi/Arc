// Resources.js

(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];


    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            //If the developer passed in an array of images

            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            //The developer did not pass an array to this function,

            _load(urlOrArr);
        }
    }

    // This is our private image loader function, it is

    function _load(url) {
        if(resourceCache[url]) {

            return resourceCache[url];
        } else {

            var img = new Image();
            img.onload = function() {

                resourceCache[url] = img;


                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };


            resourceCache[url] = false;
            img.src = url;
        }
    }


    function get(url) {
        return resourceCache[url];
    }

   
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }


    function onReady(func) {
        readyCallbacks.push(func);
    }

    //This object defines the publicly accessible functions available to

    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
