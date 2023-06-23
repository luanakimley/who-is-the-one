const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/get_list_of_candidates", (req, res) => {
        var email = req.params.email;

        var query = "SELECT * FROM candidates";

        database.query(query, res);
      });

module.exports = router;
