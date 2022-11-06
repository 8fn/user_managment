const mysql = require('mysql');

// Connection pool

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// View users
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Conected as ID ' + connection.threadId);

        // User the connection 
        connection.query('SELECT * FROM user', (err, rows) => {
            // When done with connection, release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            // console.log('The data from user table :\n', rows);

        });
    });
}

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Conected as ID ' + connection.threadId);

        let searchTerm = req.body.search;


        // User the connection 
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with connection, release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table :\n', rows);

        });
    });
}

exports.form = (req, res) => {
    res.render('add-user');
}
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    // res.render('add-user');
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Conected as ID ' + connection.threadId);

        let searchTerm = req.body.search;


        // User the connection 
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email=?, phone=?, comments=?', [first_name, last_name, email, phone, comments], (err, rows) => {
            // When done with connection, release it
            connection.release();
            if (!err) {
                res.render('add-user', {alert: 'User added successfuly.'});
            } else {
                console.log(err);
            }
            console.log('The data from user table :\n', rows);

        });
    });
}

// Edit user
exports.edit = (req, res) => {
    // User the connection
    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            if (!err) {
              res.render('edit-user', { rows });
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n', rows);
          });
    })}
  
  
  // Update User
  exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    // User the connection
    pool.getConnection((err, connection) => {
    connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
  
      if (!err) {
        // User the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
          // When done with the connection, release it
          
          if (!err) {
            res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
          } else {
            console.log(err);
          }
          console.log('The data from user table: \n', rows);
        });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  })}