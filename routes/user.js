const express = require("express");
const router = express.Router();
const {
  register,
  getUsers,
  getUser,
  updateUser,
} = require("../controllers/user");
const { validateRegister, validationErrors } = require("../validators/auth");
const { requireLogin } = require("../controllers/auth");
router
  .route("/")
  .post(validateRegister, validationErrors, register)
  .get(getUsers);

router.route("/:userId").get(getUser).put(requireLogin, updateUser);

module.exports = router;
