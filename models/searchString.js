var mongoose = require("mongoose")
var Schema = mongoose.Schema

var searchStringSchema = new Schema({
    'search string': String,
    'date': Date
})

var searchString = mongoose.model('searchString', searchStringSchema)

module.exports = searchString