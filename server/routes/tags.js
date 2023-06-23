const express = require("express");
const tagsRoutes = express.Router();
const Database = require("./Database");
const database = new Database();

tagsRoutes.get("/get_list_of_tags_for_a_user", (req, res) => {
        var userId = "1";

        var query = "CALL get_all_tags_by_user_id(?);"

        database.query(query, [userId], (result) => res.json(result));
      });

module.exports = tagsRoutes;