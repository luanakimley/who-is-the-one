const express = require("express");
const router = express.Router();

const {
  userLogin,
  userRegister,
  deleteUser,
  getAllUsers,
  editUserId,
  editPassword,
  editEmail
} = require("../controllers/users");

router
  .post("/login", userLogin)
  .post("/register", userRegister)
  .get("/users", getAllUsers)
  .delete("/users/:userId", deleteUser)
  .put("edit_user_id", editUserId)
  .put("edit_password", editPassword)
  .put("edit_email", editEmail)


module.exports = router;
