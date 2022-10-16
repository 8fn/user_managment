const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parse middleware
app.use(express.urlencoded({extended: true})); 

// Parse application/json
app.use(express.json());

// Static files
app.use(express.static('public'));

// Template engine
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Router
app.get('', (req, res) => {
    res.render('home');
})

app.listen(port, () => console.log(`Listening on port ${port}`));