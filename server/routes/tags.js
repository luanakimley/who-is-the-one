const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/get_list_of_tags_for_a_user/:userId", (req, res) => {
        var userId = req.params.userId;

        var query = "CALL get_all_tags_by_user_id(?);"

        database.query(query, [userId], (result) => res.json(result));
      });


router.get("/get_list_of_tags_for_a_category/:categoryId", (req, res) => {
        var categoryId = req.params.categoryId;

        var query = "CALL get_all_tags_for_a_category(?);"

        database.query(query, [userId], (result) => res.json(result));
      });


router.get("/user_preference/:categoryId", (req, res) => {
        var categoryId = req.params.categoryId;

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

router.post("/insert_user_preferences", (req, res) => {
  var categoryId = req.body.categoryId;
  var tagId = req.body.tagId;
  var weight = req.body.weight;

  var query =
    "INSERT INTO users_categories_preferences (category_id, tag_id, weight) VALUES (?, ?, ?);";
  database.query(query, [categoryId, tagId, weight], (result) =>res.send("Insert user_preferences with weight ${weight}"));
});

module.exports = router;