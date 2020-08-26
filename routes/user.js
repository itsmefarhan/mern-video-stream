const express = require("express");
const router = express.Router();
const { register } = require("../controllers/user");
const { validateRegister, validationErrors } = require("../validators/auth");

router.route("/").post(validateRegister, validationErrors, register);

module.exports = router;
