# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 1

For the **Restaurant Reviews** projects, you will incrementally convert a static webpage to a mobile-ready web application. In **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

### Specification

You have been provided the code for a restaurant reviews website. The code has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. Your job is to update the code to resolve these issues while still maintaining the included functionality. 

### What do I do from here?

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

2. With your server running, visit the site: `http://localhost:8000`, and look around for a bit to see what the current experience looks like.
3. Explore the provided code, and make start making a plan to implement the required features in three areas: responsive design, accessibility and offline use.
4. Write code to implement the updates to get this site on its way to being a mobile-ready website.

### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. As much as possible, try to maintain use of ES6 in any additional JavaScript you write. 

## How to access the app

Download this repo, follow instrunctions as described in "What do I do from here?". Enjoy

## Journal

This is a diary of the steps I took to complete this project.

1. First day: I am trying to find my way around the code I was given. 

    The maps not displaying, I have to fix that. David Lower provided a link so I can get a Google Maps API number, and it worked. The maps are fixed.

2. Changes are not updating on the browser.
        I just have to press shift-refresh, and it's there. it's because of the browser cache. Other solution is start the server in incognito mode.

3. I have to give the images an alt text, which I tried in main.js -> createRestaurantHTML () -> image.alt = "restaurant photo" which makes it appear in the html, but I am not sure it actually works, because it won't work on hover as usual. I managed to pass the custom na too! I did it in the map also!!!
    The reviewer suggested that I give the images better custom alt descriptions, but that is much more complicated. I am guessing I would have to pass one to the json data. It was easier than I expected. I passed the data in json, then just called it in the restaurant object in main.js. Alain helped with that.

4. I put a focus feature in the restaurant selection menu and the restaurant buttons. I decided to go with vivid colors.
    Done!
    
5. Must fix focus for tab. I thing it must go from header to the filters. Tab-index maybe?
I am still strying to skip the tabindex of the map, but tabindex="-1" doesn't do the trick...! I think the tab attribute can be removed with some code, but it looks like an overkill. Furthermore, the problem is that setting the tabindex manually 1:header, 2: dropdown menu....etc doesn't work either, 'cause the tab goes back to the maps (edited). Mohammed Riaad told me that G.M. can't be tempered with, so I won't be trying anymore. I decided to leave tabindex as is. After all it's not a good idea to mess with it.

6. Must implement aria attributes. Note sure yet. I did some semantics.
    Have to fix second page some stuff like the reviewer said.
        Done, I think.

7. Implement meta data for responsive UX
    Done!
    
8. Implement Service Worker:   
        I found a solution online, I will try that. https://www.youtube.com/watch?v=BfL3pprhnms
        It works offline.
            Nope it doesn't. Reviewer gave me a red light. I had a mistake in  my fetch code. I initiated the SW like in the google example (https://developers.google.com/web/fundamentals/primers/service-workers/), which had an extra event listener. I think it works better this way. The rest looks pretty similar
                I am still experiencing problems, because my reviewers can't get the pages to reload, but I can. I am changing the fetch code with the one in https://developers.google.com/web/fundamentals/primers/service-workers/.

9. Fix visual element for responsive UX.
    As the reviewer pointed out, I need to fix some stuff.
        Done!

## Acknowledgements

For this project I want to thank the community for their support as always, special mentions to David Lower, Mohammed Riaad and Alain. A thank you to the girl on the You Tube "bitsofcode" video for a very good solution, which helped very much my understanding of Service Workers.
