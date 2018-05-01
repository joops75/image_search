# Image Search Abstraction Layer
Note: app not currently working as the node-bing-api key has expired

This app takes a search term via the address bar and then returns a list of 10 matching image items which detail the image name, thumbnail url and host page url. Results may be skipped by adding '?offset={number}' to the end of the search term, where 'number' respresents the required search results page.

When the search term (perhaps with offset) is entered, it is both stored in the mongoDB database with the current date and used to call the Microsoft Cognitive Services Bing Image Search API. The results from the api are then processed and displayed by the app.

When '/history' is typed at the end of the root address, the database is queried for all saved search terms, the last 10 of which are then displayed.

Technologies used in this project:
* node
* express
* mongoDB
* mongoose

Addtional packages of note:
* node-bing-api
