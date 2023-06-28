const express = require("express");
const router = express.Router();

const {
  getCandidatesByCategoryId,
  getCandidatesByPreference,
  deleteCandidate,
  addCandidate,
  editCandidate
} = require("../controllers/candidates");

router
  .get("/candidates/:categoryId", getCandidatesByCategoryId)
  .post("/candidates_by_preference", getCandidatesByPreference)
  .delete("/remove_candidate/:candidateId", deleteCandidate)
  .post("/insert_candidate", addCandidate)
  .put("/edit_category", editCandidate)

module.exports = router;

