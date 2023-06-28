const express = require("express");
const router = express.Router();

const {
  userLogin,
  userRegister,
  deleteUser,
  getAllUsers,
  editPassword,
  editUsernameEmail
} = require("../controllers/users");

router
  .post("/login", userLogin)
  .post("/register", userRegister)
  .get("/users", getAllUsers)
  .delete("/users/:userId", deleteUser)
  .put("/edit_username_email", editUsernameEmail)
  .put("/edit_password", editPassword)


module.exports = router;
