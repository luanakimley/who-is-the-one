const database = require("../db/Database");

exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";
  database.query(query, (result) => res.json(result));
}

exports.userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = "SELECT * FROM users WHERE email = ? AND user_password = ?;";
  database.query(query, [email, password], (result) => res.json(result));
}

exports.userRegister = (req, res) => {
  const userName = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const query = "INSERT INTO users (user_id, email, user_password) VALUES (?, ?, ?);";
  database.query(query, [userName, email, password], (result) => res.send(`Insert user with ID ${result.userId}`));
}

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  const query = "DELETE FROM users WHERE user_id = ?";
  database.query(query, [userId], (result) => res.send(`Delete user with ID ${userId}`));
}
