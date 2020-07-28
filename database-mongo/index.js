var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inspiread');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var glossarySchema = new mongoose.Schema({
  word: String,
  definition: Array
});

var quotesSchema = new mongoose.Schema({
  quote: String
});

var Glossary = mongoose.model('Glossary', glossarySchema);

var Quotes = mongoose.model('Quotes', quotesSchema);

module.exports = {
  getGlossary: function (callback) {
    Glossary.find({}, callback)
  },

  addGlossary: function (word, def, callback){
    Glossary.create({word: word, definition: def}, callback)
  },

  getQuotes: function (callback) {
    Quotes.find({}, callback)
  },

  addQuotes: function (quote, callback){
    Quotes.create({quote: quote}, callback)
  }
}