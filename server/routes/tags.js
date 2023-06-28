const express = require("express");
const router = express.Router();

const {
  getTagsByUserId,
  getTagsCountByUserId,
  getTagsByCandidateId,
  getTagsByCategoryId,
  deleteTag,
  deleteTagForCandidate,
  addTag,
  addTagForCandidate,
  addTagForUser
} = require("../controllers/tags");

router
  .get("/tags_by_users/:userId", getTagsByUserId)
  .get("/tags_count/:userId", getTagsCountByUserId)
  .get("/tags_by_candidate/:candidateId", getTagsByCandidateId)
  .get("/tags_by_category/:categoryId", getTagsByCategoryId)
  .delete("/remove_tag/:tagId", deleteTag)
  .delete("/remove_tag_for_candidate/:tagId/:candidateId", deleteTagForCandidate)
  .post("/insert_tag", addTag)
  .post("/insert_tag_for_candidate", addTagForCandidate)
  .post("/insert_tag_for_user", addTagForUser)

module.exports = router;