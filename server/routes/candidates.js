const express = require("express");
const router = express.Router();

const {
  getCandidatesByCategoryId,
  getCandidatesByPreference,
  deleteCandidate,
  addCandidate
} = require("../controllers/candidates");

router
  .get("/candidates/:categoryId", getCandidatesByCategoryId)
  .get("/candidates_by_preference/:userPreference", getCandidatesByPreference)
  .delete("/remove_candidate/:candidateId", deleteCandidate)
  .post("/insert_candidate", addCandidate)

module.exports = router;

