const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/tags_by_users/:userId", (req, res) => {
        const userId = req.params.userId;

        const query = "CALL get_all_tags_by_user_id(?);"

        database.query(query, [userId], (result) => res.json(result));
      });

router.get("/tags_by_candidate/:candidateId", (req, res) => {
        const candidateId = req.params.candidateId;

        const query = "SELECT tags.* FROM tags " + "\n" +
                              "JOIN tags_in_candidates ON tags.tag_id = tags_in_candidates.tag_id " + "\n" +
                              "WHERE tags_in_candidates.candidate_id = ?;"

        database.query(query, [candidateId], (result) => res.json(result));
});

router.get("/tags_by_category/:categoryId", (req, res) => {
        const categoryId = req.params.categoryId;
        const query = "CALL get_all_tags_for_a_category(?);"

        database.query(query, [categoryId], (result) => res.json(result));
      });


router.delete("/remove_tag/:tagId/:candidateId", (req, res) => {
  const tagId = req.params.tagId;
  const candidateId = req.params.candidateId;
  const query = "DELETE FROM tags_in_candidates WHERE tag_id = ? AND candidate_id = ?";
  database.query(query, [tagId, candidateId], (result) => res.send(`Delete tag with ID ${tagId} from candidate with ID ${candidateId}`));
});

router.post("/insert_tag", (req, res) => {

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

module.exports = router;