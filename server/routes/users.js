const express = require("express");
const router = express.Router();

const {
  userLogin,
  userRegister,
  deleteUser,
  getAllUsers
} = require("../controllers/users");

router
  .post("/login", userLogin)
  .post("/register", userRegister)
  .get("/users", getAllUsers)
  .delete("/users/:userId", deleteUser)

module.exports = router;
