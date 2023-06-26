const express = require("express");
const router = express.Router();

const {
  getCandidatesByCategoryId,
  deleteCandidate,
  addCandidate
} = require("../controllers/candidates");

router
  .get("/candidates/:categoryId", getCandidatesByCategoryId)
  .delete("/remove_candidate/:categoryId", deleteCandidate)
  .post("/insert_candidate", addCandidate)

module.exports = router;

