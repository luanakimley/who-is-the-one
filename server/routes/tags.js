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

router.get("/insert_user_preferences", (req, res) => {
  var categoryId = req.body.categoryId;
  var tagId = req.body.tagId;
  var weight = req.body.weight;

  var query =
    "INSERT INTO users_categories_preferences (category_id, tag_id, weight) VALUES (?, ?, ?);";
  database.query(query, [categoryId, tagId, weight], (result) =>res.send("Insert user_preferences with weight ${weight}"));
});

module.exports = router;