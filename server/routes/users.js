const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = "SELECT * FROM users WHERE email = ? AND user_password = ?;";
  database.query(query, [email, password], (result) => res.json(result));
});

router.post("/register", (req, res) => {
  const userName = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  var query = "INSERT INTO users (user_id, email, user_password) VALUES (?, ?, ?);";
  database.query(query, [userName, email, password], (result) =>res.send("Insert user with ID ${userId}"));
});

router.delete("/remove_user/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "DELETE FROM users WHERE user_id = ?";
  database.query(query, (result) => res.send("Delete user with ID ${userId}"));
});

router.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  database.query(query, (result) => res.json(result));
});

module.exports = router;
