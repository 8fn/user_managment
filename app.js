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

// Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to DB

pool.getConnection((err, connection) => {
    if(err) throw err; // not connected!
    console.log('Conected as ID ' + connection.threadId);
});

const routes = require('./server/routes/user');
app.use('/', routes);

// Router
app.get('', (req, res) => {
    res.render('home');
})

app.listen(port, () => console.log(`Listening on port ${port}`));