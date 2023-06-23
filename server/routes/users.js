const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.post("/get_user_by_email_password", (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        var query = "SELECT * FROM users WHERE email = ? AND user_password = ?";

        database.query(query, [email, password], res);
      });

router.post('/register_user', (req, res) => {
      var userName = req.body.username;
      var email = req.body.email;
      var userPassword = req.body.password;

      var query = "INSERT INTO users (user_name, email, user_password) VALUES (?, ?, ?)";
      database.query(query, [userName, email, userPassword], res);
    });

router.delete("/remove_user", (req, res) => {
        var userId = req.body.user_id;
        var query = "DELETE FROM users WHERE user_id = ?";
        database.query(query, [userId], res);
  });

router.get("/get_list_of_users", (req, res) => {
          let query = "SELECT * FROM users";
          database.query(query, res);
  });


module.exports = router;