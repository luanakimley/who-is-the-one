const database = require("../db/Database");

exports.getCandidatesByCategoryId = (req, res) => {
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

  const userPreference = JSON.parse(req.body.userPreference);
  getListOfCandidatesByCategory(userPreference.category_id, (candidates) => {

      const rankedCandidates = rankListOfCandidates(userPreference.tagWeights, Object.values(candidates));
      res.json(rankedCandidates);
    });
}

exports.editCandidate = (req, res) => {
    const newCandidateName = req.body.candidateName;
    const candidateId = req.body.categoryId;

    const query = "UPDATE candidates SET candidate_name = ? WHERE candidate_id = ?";
    database.query(query, [newCandidateName, candidateId], (result) => res.send(`Update candidate_name where ID ${candidateId}`));
}

function getListOfCandidatesByCategory(categoryId, callback)
{
  const query = "CALL get_all_candidates_by_category(?)";

  database.query(query, [categoryId], (result) => {

    const candidates = {};

    result[0].forEach((row) => {
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

      if (tag.tag_id !== null && tag.tag_description !== null)
      {
        candidates[candidateId].tags.push(tag);
      }
    });
    callback(candidates);
  });
}

function rankListOfCandidates(tagWeights, categoryList)
{
  const rankedCandidates = [];
  const tagWeightsLookup = {};

  for (const tag of tagWeights)
  {
    tagWeightsLookup[tag.tag_id] = tag.weight;
  }

  for (const candidate of categoryList)
   {
    const candidateId = candidate.candidate_id;
    const candidateName = candidate.candidate_name;
    const tags = candidate.tags;
    let score = 0;

    for (const tag of tags)
    {
      if (tag.tag_id in tagWeightsLookup)
      {
        score += tagWeightsLookup[tag.tag_id];
      }
    }

    const rankedCandidate =
    {
      candidate_id: candidateId,
      candidate_name: candidateName,
      tags: tags,
      score: score
    };

    rankedCandidates.push(rankedCandidate);
  }

  return rankedCandidates;
}
