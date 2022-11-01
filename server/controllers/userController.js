const mysql = require('mysql');

// Connection pool

const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// View users
exports.view = (req, res) => {
   
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Conected as ID ' + connection.threadId);

        // User the connection 
        connection.query('SELECT * FROM user', (err, rows) => {
            // When done with connection, release it
            connection.release();
            if(!err){
                res.render('home', {rows});
            } else {
                console.log(err);
            }
           // console.log('The data from user table :\n', rows);

        });
    });
}

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Conected as ID ' + connection.threadId);

        let searchTerm = req.body.search;


        // User the connection 
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with connection, release it
            connection.release();
            if(!err){
                res.render('home', {rows});
            } else {
                console.log(err);
            }
            console.log('The data from user table :\n', rows);

        });
    });
}