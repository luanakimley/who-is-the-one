const express = require("express");
const routes = express.Router();
const mysql = require("mysql");

let database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "voting_system",
});

database.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

routes
  .get("/get_list_of_candidates", (req, res) => {
    let query = "SELECT * FROM candidates";
    database.query(query, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  })

  .get("/get_user_by_email/:email", (req, res) => {
    var email = req.params.email;

    var query = "SELECT * FROM users WHERE email = ?";

    database.query(query, [email], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  })

  .post("/register_user", (req, res) => {
    var email = req.body.email;
    var userPassword = req.body.password;

    var query = "INSERT INTO users (email, user_password) VALUES (?, ?)";
    database.query(query, [email, userPassword], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  })

  .get("/remove_user", (req, res) => {
    var userId = 1;
    var query = "DELETE FROM users WHERE user_id = ?";
    database.query(query, [userId], (err, result) => {
      if (err) throw err;
    });
  });

module.exports = routes;
