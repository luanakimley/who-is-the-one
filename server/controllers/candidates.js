const database = require("../db/Database");

exports.getCandidatesByCategoryId = (req, res) => {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    getListOfCandidatesByCategory(categoryId, (candidates) => res.json(Object.values(candidates)));
}

exports.deleteCandidate = (req, res) => {
    const candidateId = req.params.candidateId;
    const query = "DELETE FROM candidates WHERE candidate_id = ?";
    database.query(query, [candidateId], (result) => res.send(`Delete candidate with ID ${candidateId}`));
}

exports.addCandidate = (req, res) => {
    const categoryId = req.body.categoryId;
    const candidateName = req.body.candidateName;
    const queryInsert = "INSERT INTO candidates (category_id, candidate_name) VALUES (?, ?);";

    database.query(queryInsert, [categoryId, candidateName], (result) => {

        const querySelect = "SELECT * FROM candidates WHERE candidate_name = ? AND category_id = ?";

        database.query(querySelect, [candidateName, categoryId], (resultSelect) => res.json(resultSelect));
    });
}

exports.getCandidatesByPreference = (req, res) => {
//  const tagWeights = req.params.tagWeights;
//
//  getListOfCandidatesByCategory(userId, categoryName, (candidates) => {
//      const rankedCandidates = rankListOfCandidates(tagWeights, Object.values(candidates));
//      res.json(rankedCandidates);
//    });
}

function getListOfCandidatesByCategory(categoryId, callback)
{
  const query = "CALL get_all_candidates_by_category(?)";

  database.query(query, [categoryId], (result) => {
    console.log(result)
    const candidates = {};

    result.forEach((row) => {
      const candidateId = row.candidate_id;
      const candidateName = row.candidate_name;
      const tagId = row.tag_id;
      const tagDescription = row.tag_description;

      const tag = {
        tag_id: tagId,
        tag_description: tagDescription
      }

      if (!candidates[candidateId])
      {
        candidates[candidateId] = {
          candidate_id: candidateId,
          candidate_name: candidateName,
          tags: [],
        };
      }

      candidates[candidateId].tags.push(tag);
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