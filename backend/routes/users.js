const express = require("express");
const { signupHandler, getUsersFromDatabase, loginHandler, findUserById } = require("../controllers/users");
const router = express.Router();

router.get("/users", getUsersFromDatabase);
router.get("/users/:id", findUserById);
router.post("/signup", signupHandler);
router.post("/login", loginHandler);

module.exports = router;