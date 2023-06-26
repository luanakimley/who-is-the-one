const express = require("express");
const router = express.Router();

const {
  getUserPreferencesByCategoryId,
  addUserPreference,
  deleteUserPreference
} = require("../controllers/user_preferences");

router
  .get("/user_preferences/:categoryId", getUserPreferencesByCategoryId)
  .post("/insert_user_preference", addUserPreference)
  .delete("/remove_user_preference/:categoryId/:tagId", deleteUserPreference)

module.exports = router;