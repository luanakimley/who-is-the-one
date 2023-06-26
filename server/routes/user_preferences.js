const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/user_preference/:categoryId", (req, res) => {
        const categoryId = req.params.categoryId;

        const query = "SELECT categories.category_id, categories.category_name, tag_id, weight FROM users_categories_preferences " + "\n" +
                      "JOIN categories ON users_categories_preferences.category_id = categories.category_id WHERE categories.category_id = ?;"

      database.query(query, [categoryId], (result) => {
        if (result.length === 0) {
          res.status(404).json({ error: "No preferences found for the given category." });
          return;
        }
        const preferences = {
          categoryId: result[0].category_id,
          categoryName: result[0].category_name,
          weights: {},
        };

        result.forEach((row) => {
          const tagId = row.tag_id;
          const weight = row.weight;
          preferences.weights[tagId] = weight;
        });

        res.json(preferences);
    });

});

router.post("/insert_user_preference", (req, res) => {
  const categoryId = req.body.categoryId;
  const tagId = req.body.tagId;
  const weight = req.body.weight;

  const query = "INSERT INTO users_categories_preferences (category_id, tag_id, weight) VALUES (?, ?, ?);";
  database.query(query, [categoryId, tagId, weight], (result) =>res.send("Insert user_preferences with weight ${weight}"));
});

router.delete("/remove_user_preference/:categoryId/:tagId", (req, res) => {
  const categoryId = req.params.categoryId;
  const tagId = req.params.tagId;

  const query = "DELETE FROM users_categories_preferences WHERE category_id = ? AND tag_id = ?";
  database.query(query, [categoryId, tagId], (result) => res.send(`Delete user preference with tag with ID ${tagId} and category with ID ${categoryId}`));
});


module.exports = router;