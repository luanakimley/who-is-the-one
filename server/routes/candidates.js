const express = require("express");
const router = express.Router();
const Database = require("./Database");
const database = new Database();

router.get("/get_list_of_candidates_by_category/:userId/:categoryName", (req, res) => {
  const userId = req.params.userId;
  const categoryName = req.params.categoryName;

  getListOfCandidatesByCategory(userId, categoryName, (candidates) => {
      res.json(Object.values(candidates));
    });
});

router.get("/sort_candidates_in_a_category_by_preferences/:tagWeights", (req, res) => {
  var tagWeights = req.params.tagWeights;

  getListOfCandidatesByCategory(userId, categoryName, (candidates) => {
      console.log(Object.values(candidates))
      const rankedCandidates = rankListOfCandidates(tagWeights, Object.values(candidates));
      res.json(rankedCandidates);
    });
});


function getListOfCandidatesByCategory(userId, categoryName, callback)
{
  const query = "CALL get_all_of_candidates_by_category(?, ?)";

  database.query(query, [userId, categoryName], (result) => {
    const candidates = {};

    // Iterate over the query result
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

      // Add the tag to the candidate's tags array
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

