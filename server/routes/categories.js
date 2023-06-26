const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/categories/:userId", (req, res) => {
        const userId = req.params.userId;
        const query = "SELECT categories.category_id, categories.category_name FROM categories WHERE user_id = ?"
        database.query(query, [userId], (result) => res.json(result));
      });

router.get("/insert_category", (req, res) => {
        const categoryName = req.body.candidateName;
        const userId = req.body.userId;

        const queryInsert = "INSERT INTO categories (category_name, user_id) VALUES (?, ?);";

        database.query(queryInsert, [categoryName, userId], (result) => {

            const querySelect = "SELECT * FROM categories WHERE category_name = ? AND user_id = ?";

            database.query(querySelect, [categoryName, userId], (resultSelect) => res.json(resultSelect));
        });
 });

router.get("/remove_category/:categoryId", (req, res) => {
  const categoryId = 2;
  const query = "DELETE FROM categories WHERE category_id = ?";
  console.log("YEs")
  database.query(query, [categoryId], (result) => res.send(`Delete category with ID ${categoryId}`));
});

module.exports = router;