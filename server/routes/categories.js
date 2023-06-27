const express = require("express");
const router = express.Router();

const {
  getCategoriesByUserId,
  addCategory,
  deleteCategory
} = require("../controllers/categories");

router
  .get("/categories/:userId", getCategoriesByUserId)
  .post("/insert_category", addCategory)
  .delete("/remove_category/:categoryId", deleteCategory)

module.exports = router;