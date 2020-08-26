const express = require("express");
const router = express.Router();
const { register, getUsers, getUser } = require("../controllers/user");
const { validateRegister, validationErrors } = require("../validators/auth");

router
  .route("/")
  .post(validateRegister, validationErrors, register)
  .get(getUsers);

router.route("/:userId").get(getUser);

module.exports = router;
