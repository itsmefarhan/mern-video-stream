const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth");
const { validateLogin, validationErrors } = require("../validators/auth");

router.route("/").post(validateLogin, validationErrors, login);

module.exports = router;
