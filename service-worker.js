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

self.addEventListener("fetch", function(e){
    console.log("S-W: Fetching", e.request.url)
    
    // Responds to the fetch event
    e.respondWith (
        //check in cache whether requested url already exists so we don't have to fetch again:
        caches.match(e.request).then(function(response){
            if (response){ //if request already exists...
                console.log("S-W: Already in cache", e.request.url);//...inform me
                return response; //...and return the cached version
            }

            //if it's not in the cache we have to fetch it:
            //but we have to clone the response so we can reuse it over and over
            let requestClone = e.request.clone();

            fetch(requestClone)
                .then(function(response){
                    //if there is no response...
                    if(!response){
                        console.log("S-W: No fetch response");
                        return response;
                    }
                    // if there is a response
                    let responseClone = response.clone();
                    //open the cache again
                    caches.open(cacheVersion).then(function(cache){
                        cache.put(e.request, responseClone);
                        return response;
                    })

                })
                .catch(function(error){
                    console.log("S-W: Error Fetching & Catching new Data", error);
                });
        }) // end caches.match(e.request)
    ); //end respondWith
})
