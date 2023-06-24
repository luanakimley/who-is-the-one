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

router.post("/insert_candidate", (req, res) => {
  const candidateName = req.body.candidateName;
  categoryId = req.body.categoryId;
  let candidateId = "";

  let query = "INSERT INTO candidates (candidate_name) VALUES (?);";

  database.query(query, [candidateName], (result) => {

    candidateId = result.candidate_id;
    res.send('Insert candidates with candidate_name ${categoryName}')
    });

  query = "INSERT INTO candidates_in_categories (category_id, candidate_id) VALUES (?, ?);";
  database.query(query, [categoryId, candidateId], (result) =>res.send('Insert candidates_in_categories with category_id ${category_id}'));
});


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

