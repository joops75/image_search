var express = require("express")
var app = express()
var Bing = require('node-bing-api')({accKey: process.env.ACC_KEY})//ACC_KEY set via command line
var mongoose = require("mongoose")
var searchString = require("./models/searchString")
var filtered = require("./filtered")
var history = require("./history")
var resultQuant = 10
var port = (process.env.PORT || 3000)
var address = process.env.IP

// mongoose.connect('mongodb://' + address + '/image_search')//used for local connection
mongoose.connect(process.env.MONGOLAB_URI)//MONGOLAB_URI set via command line

app.get('/', function(req, res) {
    res.set({'content-type': 'application/json; charset=utf-8'})
    res.end("To search for images, type '/search/' at the end of the root address in the address bar followed by a search string. This string may optionally be followed by '?offset={number}' to paginate through the results by the specified number. \n\nTo get the 10 most recent searches, type '/history' at the end of the root address in the address bar.")
})

app.get('/search/:searchTerm(*)', function(req, res) {
    var searchTerm = req.params.searchTerm
    var offset
    req.query.offset ? offset = req.query.offset : offset = 0
    var newSearchString = searchString({'search string': searchTerm, 'date': new Date()})
    newSearchString.save(function(err) {
        if (err) throw err
    })
    Bing.images(searchTerm, {
        top: resultQuant,   // Number of results (max 50) 
        skip: offset    // Number of results to skip
    }, function(error, resp, body){
        var arr = []
        for (var i = 0; i < body.value.length; i++) {
            arr.push(new filtered(body.value[i]))
        }
        res.set({'content-type': 'application/json; charset=utf-8'})
        res.end(JSON.stringify(arr))
        // res.json(arr)//alternative to the above two lines
    })
})

app.get('/history', function(req, res) {
    searchString.find({}, function(err, data) {
        if (err) throw err
        var arr = []
        var start
        data.length - resultQuant < 0 ? start = 0 : start = data.length - resultQuant
        for (var i = start; i < data.length; i++) {
            arr.push(new history(data[i]))
        }
        res.set({'content-type': 'application/json; charset=utf-8'})
        res.end(JSON.stringify(arr))
    })
})

app.listen(port)