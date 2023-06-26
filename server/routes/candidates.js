const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/candidates/:userId/:categoryName", (req, res) => {
  const userId = req.params.userId;
  const categoryName = req.params.categoryName;

  getListOfCandidatesByCategory(userId, categoryName, (candidates) => {
      res.json(Object.values(candidates));
    });
});

router.get("/sort_candidates/:tagWeights", (req, res) => {
  const tagWeights = req.params.tagWeights;

  getListOfCandidatesByCategory(userId, categoryName, (candidates) => {
      const rankedCandidates = rankListOfCandidates(tagWeights, Object.values(candidates));
      res.json(rankedCandidates);
    });
});

router.delete("/remove_candidate/:candidateId/:categoryId", (req, res) => {
  const candidateId = req.params.candidateId;
  const categoryId = req.params.categoryId;
  const query = "DELETE FROM candidates_in_categories WHERE candidate_id = ? AND category_id = ?";
  database.query(query, [candidateId, categoryId], (result) => res.send(`Delete candidate with ID ${candidateId} from category with ID ${categoryId}`));
});

router.post("/insert_candidate", (req, res) => {
      const candidateName = req.body.candidateName;
      const categoryId = req.body.categoryId;
      let candidateId = 0;

    selectCandidateByName(candidateName, (result) =>
    {
        if(result.length !== 0)
        {
           candidateId = result[0].candidate_id;
        }

        if (candidateId === 0)
        {
            const queryInsert = "INSERT INTO candidates (candidate_name) VALUES (?);";
            database.query(queryInsert, [candidateName], (insertResult) => {

                selectCandidateByName(candidateName, (selectAfterInsertResult) =>
                {
                    candidateId = selectAfterInsertResult[0].candidate_id;
                    insertIntoCandidatesInCategories(categoryId, candidateId);
                    res.json(selectAfterInsertResult[0]);
                });

            });
        }
        else
        {
            insertIntoCandidatesInCategories(categoryId, candidateId);
            res.json(result[0]);
        }
    });

    });

function selectCandidateByName(candidateName, callback)
{
     const query = "SELECT * FROM candidates WHERE candidate_name = ?;";

     database.query(query, [candidateName], (result) =>
     {
        callback(result)
     });
}

function insertIntoCandidatesInCategories(categoryId, candidateId)
{
  const query = "INSERT INTO candidates_in_categories (category_id, candidate_id) VALUES (?, ?);";

  database.query(query, [categoryId, candidateId], (result) => {

    console.log("Candidate inserted");
    const querySelectCandidate = "SELECT * FROM candidates WHERE candidate_id = ?;";
    database.query(querySelectCandidate, [candidateId], (selectResult) => {});
  });

}

function getListOfCandidatesByCategory(userId, categoryName, callback)
{
  const query = "CALL get_all_of_candidates_by_category(?, ?)";

  database.query(query, [userId, categoryName], (result) => {
    const candidates = {};

    result.forEach((row) => {
      const candidateId = row.candidate_id;
      const candidateName = row.candidate_name;
      const tagName = row.tag_description;


      if (!candidates[candidateId])
      {
        candidates[candidateId] = {
          candidate_id: candidateId,
          candidate_name: candidateName,
          tags: [],
        };
      }

      candidates[candidateId].tags.push(tagName);
    });

    callback(candidates);
  });
}

function rankListOfCandidates(tagWeights, categoryList)
{
  const rankedCandidates = [];

  for (const candidate of categoryList)
  {
    const candidateId = candidate.candidate_id;
    const candidateName = candidate.candidate_name;
    const tags = candidate.tags;

    let score = 0;

    for (const tag of tags)
    {
      if (tagWeights.hasOwnProperty(tag))
      {
        score += tagWeights[tag];
      }
    }

    const percentageScore = score * 100;

    rankedCandidates.push(
    {
      candidate_id: candidateId,
      candidate_name: candidateName,
      score: percentageScore,
    }
    );
  }

  // Sort candidates based on score in descending order
  rankedCandidates.sort((a, b) => b.score - a.score);

  return rankedCandidates;
}

module.exports = router;

