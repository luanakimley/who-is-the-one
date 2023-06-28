const express = require("express");
const router = express.Router();

const {
  userLogin,
  userRegister,
  getUserPassword,
  deleteUser,
  getAllUsers,
  editPassword,
  editUsernameEmail
} = require("../controllers/users");

router
  .post("/login", userLogin)
  .post("/register", userRegister)
  .get("/password/:userId", getUserPassword)
  .get("/users", getAllUsers)
  .delete("/users/:userId", deleteUser)
  .put("/edit_username_email", editUsernameEmail)
  .put("/edit_password", editPassword)


module.exports = router;
