const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/get_list_of_candidates_by_category/:userId/:categoryName", (req, res) => {
        var userId = req.params.userId;
        var categoryName = req.params.categoryName;

        var query = "SELECT candidates.* FROM candidates " + "\n" +
                    "JOIN candidates_in_categories ON candidates.candidate_id = candidates_in_categories.candidate_id " + "\n" +
                    "JOIN categories ON candidates_in_categories.category_id = categories.category_id WHERE categories.user_id = ? AND categories.category_name = ?;";

        database.query(query, [userId, categoryName], (result) => res.json(result));
      });

module.exports = router;
