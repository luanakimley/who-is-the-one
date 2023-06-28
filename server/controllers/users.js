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
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  console.log(username)

  const query = "INSERT INTO users (user_name, email, user_password) VALUES (?, ?, ?);";
  database.query(query, [username, email, password], (result) => res.send("Insert user"));
}

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  const query = "DELETE FROM users WHERE user_id = ?";
  database.query(query, [userId], (result) => res.send(`Delete user with ID ${userId}`));
}

exports.editPassword =  (req, res) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;

    const query = "UPDATE users SET user_password = ? WHERE user_id = ?";
    database.query(query, [newPassword, userId], (result) => res.send(`Update password where ID ${userId}`));
}

exports.editUsernameEmail =  (req, res) => {

    const newEmail = req.body.email;
    const newUsername = req.body.username;
    const userId = req.body.userId;

    const query = "UPDATE users SET email = ?, user_name = ? WHERE user_id = ?";
    database.query(query, [newEmail, newUsername, userId], (result) => res.send(`Update email and username where ID ${userId}`));
}




