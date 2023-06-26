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

        const queryInsert = "INSERT INTO categories (user_id, category_name) VALUES (?, ?);";

        database.query(queryInsert, [userId, categoryName], (result) => {

            const querySelect = "SELECT * FROM categories WHERE category_name = ? AND user_id = ?";

            database.query(querySelect, [categoryName, userId], (resultSelect) => res.json(resultSelect));
        });
 });

router.delete("/remove_category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const query = "DELETE FROM categories WHERE category_id = ?";
  database.query(query, [categoryId], (result) => res.send(`Delete category with ID ${categoryId}`));
});

module.exports = router;