const express = require("express");
const router = express.Router();

const {
  getCategoriesByUserId,
  getCategoriesCountByUserId,
  addCategory,
  deleteCategory,
  editCategory
} = require("../controllers/categories");

router
  .get("/categories/:userId", getCategoriesByUserId)
  .get("/categories_count/:userId", getCategoriesCountByUserId)
  .post("/insert_category", addCategory)
  .delete("/remove_category/:categoryId", deleteCategory)
  .put("/edit_category", editCategory)

module.exports = router;