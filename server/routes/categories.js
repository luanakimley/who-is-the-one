const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/get_list_of_categories_by_user_id/:userId", (req, res) => {
        var userId = req.params.userId;

        var query = "SELECT categories.category_name FROM categories WHERE user_id = ?"

        database.query(query, [userId], (result) => res.json(result));
      });

module.exports = router;