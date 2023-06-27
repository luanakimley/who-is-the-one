const database = require("../db/Database");

exports.getTagsByUserId = (req, res) => {
  const userId = req.params.userId;

  const query = "SELECT * FROM tags WHERE user_id = ?";

  database.query(query, [userId], (result) => res.json(result));
};

exports.getTagsByCandidateId = (req, res) => {
  const candidateId = req.params.candidateId;

  const query =
    "SELECT tags.* FROM tags " +
    "\n" +
    "JOIN tags_in_candidates ON tags.tag_id = tags_in_candidates.tag_id " +
    "\n" +
    "WHERE tags_in_candidates.candidate_id = ?;";

  database.query(query, [candidateId], (result) => res.json(result));
};

exports.getTagsByCategoryId = (req, res) => {
  const categoryId = req.params.categoryId;
  const query = "CALL get_all_tags_for_a_category(?);";

  database.query(query, [categoryId], (result) => res.json(result));
};

exports.deleteTag = (req, res) => {
  const tagId = req.params.tagId;
  const query = "DELETE FROM tags WHERE tag_id = ?";
  database.query(query, [tagId], (result) =>
    res.send(`Delete tag with ID ${tagId}`)
  );
};

exports.deleteTagForCandidate = (req, res) => {
  const tagId = req.params.tagId;
  const candidateId = req.params.candidateId;
  const query =
    "DELETE FROM tags_in_candidates WHERE tag_id = ? AND candidate_id = ?";
  database.query(query, [tagId, candidateId], (result) =>
    res.send(
      `Delete tag with ID ${tagId} from candidate with ID ${candidateId}`
    )
  );
};

exports.addTag = (req, res) => {
  const userId = req.body.userId;
  const tagDescription = req.body.tagDescription;
  const candidateId = req.body.candidateId;
  let tagId = 0;

  selectTagsByDescription(userId, tagDescription, (result) => {
    if (result.length !== 0) {
      tagId = result[0].tag_id;
    }

    if (tagId === 0) {
      const queryInsert =
        "INSERT INTO tags (user_id, tag_description) VALUES (?, ?);";

      database.query(queryInsert, [userId, tagDescription], (insertResult) => {
        selectTagsByDescription(
          userId,
          tagDescription,
          (selectAfterInsertResult) => {
            tagId = selectAfterInsertResult[0].tag_id;
            insertIntoTagsCandidates(tagId, candidateId);
            res.json(selectAfterInsertResult);
          }
        );
      });
    } else {
      insertIntoTagsCandidates(tagId, candidateId);
      res.json(result);
    }
  });
};

exports.addTagForCandidate = (req, res) => {
  const tagId = req.body.tagId;
  const candidateId = req.body.candidateId;
  insertIntoTagsCandidates(tagId, candidateId);
};

exports.addTagForUser = (req, res) => {
  const userId = req.body.userId;
  const tagDescription = req.body.tagDescription;

  const query = "INSERT INTO tags (user_id, tag_description) VALUES (?, ?);";

  database.query(query, [userId, tagDescription], (insertResult) => {
    selectTagsByDescription(
      userId,
      tagDescription,
      (selectAfterInsertResult) => {
        res.json(selectAfterInsertResult);
      }
    );
  });
};

function insertIntoTagsCandidates(tagId, candidateId) {
  const query =
    "INSERT INTO tags_in_candidates (tag_id, candidate_id) VALUES (?, ?);";

  database.query(query, [tagId, candidateId], (result) => {});
}

function selectTagsByDescription(userId, tagDescription, callback) {
  const query = "SELECT * FROM tags WHERE user_id = ? AND tag_description = ?;";

  database.query(query, [userId, tagDescription], (result) => {
    callback(result);
  });
}
