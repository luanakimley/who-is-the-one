const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/categories/:userId", (req, res) => {
        var userId = req.params.userId;
        var query = "SELECT categories.category_id, categories.category_name FROM categories WHERE user_id = ?"
        database.query(query, [userId], (result) => res.json(result));
      });

router.post("/insert_category", (req, res) => {
        var categoryName = req.params.categoryName;
        var userId = req.params.userId;

        var query = "INSERT INTO categories (category_name, user_id) VALUES (?);";
        database.query(query, [userName, email, password], (result) =>res.send("Insert category with name ${categoryName}"));
      });

module.exports = router;