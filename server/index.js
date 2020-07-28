const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mongo');
const controllers = require('./controllers')

const app = express();
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/glossary', controllers.getGlossary);
app.post('/glossary', controllers.addGlossary);

app.get('/quotes', controllers.getQuotes);
app.post('/quotes', controllers.addQuotes);

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

