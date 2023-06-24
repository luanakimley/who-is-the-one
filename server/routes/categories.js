const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/categories/:userId", (req, res) => {
        const userId = req.params.userId;
        const query = "SELECT categories.category_id, categories.category_name FROM categories WHERE user_id = ?"
        database.query(query, [userId], (result) => res.json(result));
      });

router.post("/insert_category", (req, res) => {
        const categoryName = req.body.categoryName;
        const userId = req.body.userId;
        let categoryId = "";

        let query = "INSERT INTO categories (category_name, user_id) VALUES (?, ?);";
        database.query(query, [categoryName, userId], (result) =>{});

        query = "SELECT categories.category_id FROM categories WHERE category_name = ? AND user_id = ?";

        database.query(query, [categoryName, userId], (result) =>res.json(result));

      });

module.exports = router;