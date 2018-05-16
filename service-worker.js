//Set var cache name to v1, so we can do v2...etc
let cacheVersion = "v2";
//Set var array for files to cache. I want these files to load.
let cacheFiles = [
    "./",
    "./index.html",
    "./restaurant.html",
    "./css/styles.css",
    "./data/restaurants.json",
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "./js/dbhelper.js",
    "./js/main.js",
    "./js/restaurant_info.js"
];


/*
* Setting up Install, Activate and Fetch
*/
self.addEventListener("install", function(e){
    console.log("S-W: Installed")
    //The install event will have to wait until this promise is resolved
    e.waitUntil(
        //open the cache
        caches.open(cacheVersion).then(function(cache){
            console.log("S-W: Cashing files");//just checking
            return cache.addAll(cacheFiles);//adding all my files
        })
    )
})

self.addEventListener("activate", function(e){
    console.log("S-W: Activated")
    //Activate Event waits for this promice to resolve:
    //Make sure files from old caches don't remain 
    e.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.map(function(oldCacheVersion){//going through all the keys in cache
                //if cache name doesn't correspond to the cache name on the top: see line 2
                if(oldCacheVersion !== cacheVersion){
                    console.log("S-W: Removing cached files from new cache", oldCacheVersion);
                    return caches.delete(oldCacheVersion);//delete the cache
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(cacheFiles)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });
  