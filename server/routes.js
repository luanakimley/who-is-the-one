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
.get('/', (req, res) => {
    res.json("Hello World!")})
.get('/candidates', (req, res) => {
    let sql = 'SELECT * FROM candidates';
    database.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

module.exports = routes
