const express = require("express");
const routes = express.Router();
const mysql = require('mysql');

let database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voting_system'
});

database.connect((err => {
    if (err) throw err;
    console.log('MySQL Connected');
}));


routes
.get('/get_list_of_candidates', (req, res) => {
    let query = 'SELECT * FROM candidates';
    database.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
})

.get('/get_user/:user_name', (req, res) => {
    var email = req.params.email;

    var query = 'SELECT * FROM users WHERE user_name = ?';

    database.query(query, [email], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
})

.post('/register_user', (req, res) => {
    var userName = req.params.user_name;
    var email = req.params.email;
    var userPassword = req.params.user_password;

    var query = "INSERT INTO users (email, user_password) VALUES (?, ?, ?)";
    database.query(query, [email, userPassword, userType], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
})

.get('/remove_user', (req, res) => {

    var query = "DELETE FROM users WHERE user_name = ?";
    database.query(query, [userId], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
})

.post('/insert_candidate', (req, res) => {
    var candidateName = req.params.candidate_name;

    var query = "INSERT INTO candidates (candidate_name) VALUES (?)";
    database.query(query, [candidateName], (err, result) => {
        if (err)
        {
            console.error(err);
            res.status(500).json({ error: "Candidate already exists" });
        }
        else
        {
           res.json(result);
        }

    });
});


module.exports = routes;
