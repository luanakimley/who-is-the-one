const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/candidates/:categoryId", (req, res) => {
  const userId = req.params.userId;
  const categoryId = req.params.categoryId;

  getListOfCandidatesByCategory(categoryId, (candidates) => {
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

router.delete("/remove_candidate/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  const query = "DELETE FROM candidates WHERE category_id = ?";
  database.query(query, [categoryId], (result) => res.send(`Delete candidate with ID ${candidateId} from category with ID ${categoryId}`));
});


router.post("/insert_candidate", (req, res) => {
        const categoryId = req.body.categoryId;
        const candidateName = req.body.candidateName;

        const queryInsert = "INSERT INTO candidates (category_id, candidate_name) VALUES (?, ?);";

        database.query(queryInsert, [categoryId, candidateName], (result) => {

            const querySelect = "SELECT * FROM categories WHERE candidate_name = ? AND category_id = ?";

            database.query(querySelect, [categoryName, categoryId], (resultSelect) => res.json(resultSelect));
        });
 });

function getListOfCandidatesByCategory(categoryId, callback)
{
  const query = "CALL get_all_candidates_by_category(?)";

  database.query(query, [categoryId], (result) => {
    console.log(result)
    const candidates = {};

    result.forEach((row) => {
      const candidateId = row.candidate_id;
      const candidateName = row.candidate_name;
      const tagDescription = row.tag_description;


      if (!candidates[candidateId])
      {
        candidates[candidateId] = {
          candidate_id: candidateId,
          candidate_name: candidateName,
          tags: [],
        };
      }

      candidates[candidateId].tags.push(tagDescription);
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

