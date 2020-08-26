const express = require("express");
const router = express.Router();
const { register, getUsers } = require("../controllers/user");
const { validateRegister, validationErrors } = require("../validators/auth");

router
  .route("/")
  .post(validateRegister, validationErrors, register)
  .get(getUsers);

module.exports = router;
