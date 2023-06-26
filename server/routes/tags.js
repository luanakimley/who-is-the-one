const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/tags_by_users/:userId", (req, res) => {
        const userId = req.params.userId;

        const query = "CALL get_all_tags_by_user_id(?);"

        database.query(query, [userId], (result) => res.json(result));
      });


router.get("/tags_by_category/:categoryId", (req, res) => {
        const categoryId = req.params.categoryId;
        const query = "CALL get_all_tags_for_a_category(?);"

        database.query(query, [userId], (result) => res.json(result));
      });

router.get("/tags_by_candidate/:candidateId", (req, res) => {
        const candidateId = req.params.candidateId;

        const query = "SELECT tags.* FROM tags " + "\n" +
                              "JOIN tags_in_candidates ON tags.tag_id = tags_in_candidates.tag_id " + "\n" +
                              "WHERE tags_in_candidates.candidate_id = ?;"

        database.query(query, [candidateId], (result) => res.json(result));
});

router.get("/insert_tag", (req, res) => {

      const tagDescription = req.body.tagDescription;
      const candidateId = req.body.candidateId;
      let tagId = 0;

      selectTagsByDescription(tagDescription, (result) => {

          if(result.length !== 0)
          {
             tagId = result[0].tag_id;
          }

          if (tagId === 0)
          {
                const queryInsert = "INSERT INTO tags (tag_description) VALUES (?);";

                database.query(queryInsert, [tagDescription], (insertResult) => {

                  selectTagsByDescription(tagDescription, (selectAfterInsertResult) => {
                      tagId = selectAfterInsertResult[0].candidate_id;
                      insertIntoTagsCandidates(tagId, candidateId);
                      res.json(selectAfterInsertResult[0]);
                  });

              });
          }
          else
          {
              insertIntoTagsCandidates(tagId, candidateId);
              res.json(result[0]);
          }


      });
});

function insertIntoTagsCandidates(tagId, candidateId)
{
  const query = "INSERT INTO tags_in_candidates (tag_id, candidate_id) VALUES (?, ?);";

  database.query(query, [tagId, candidateId], (result) => {});
}

function selectTagsByDescription(tagDescription, callback)
{
     const query = "SELECT * FROM tags WHERE tag_description = ?;";

     database.query(query, [tagDescription], (result) => {
        callback(result)
     });
}

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

module.exports = router;