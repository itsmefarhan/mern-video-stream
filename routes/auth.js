const express = require("express");
const router = express.Router();
const { login, requireLogin, loggedInUser } = require("../controllers/auth");
const { validateLogin, validationErrors } = require("../validators/auth");

router
  .route("/")
  .post(validateLogin, validationErrors, login)
  .get(requireLogin, loggedInUser);

module.exports = router;
