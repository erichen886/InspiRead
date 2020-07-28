const db = require('../database-mongo');

module.exports = {
  getGlossary: function (req, res) {
    db.getGlossary((err, glossaryList) => {
      if(err) {
        res.status(404).message('error grabbing glossary')
      } else {
        res.send(glossaryList)
      }
    })
  },

  addGlossary: function (req, res) {
    const word = req.body.word;
    const def = req.body.definition;
    db.addGlossary(word, def, (err) => {
      if(err) {
        res.status(404).message('error could not add word to dictionary')
      } else {
        res.send(`${word} added`)
      }
    })
  },

  getQuotes: function (req, res) {
    db.getQuotes((err, quotesList) => {
      if(err) {
        res.status(404).message('error grabbing quotes')
      } else {
        res.send(quotesList)
      }
    })
  },

  addQuotes: function (req, res) {
    const quote = req.body.quote;
    db.addQuotes(quote, (err) => {
      if(err) {
        res.status(404).message('error could not add quote')
      } else {
        res.send(`${quote} added`)
      }
    })
  }
}