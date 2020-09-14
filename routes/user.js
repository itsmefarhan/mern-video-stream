const express = require("express");
const router = express.Router();
const {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addSubscription,
  addSubscriber,
  removeSubscription,
  removeSubscriber,
} = require("../controllers/user");
const { validateRegister, validationErrors } = require("../validators/auth");
const { requireLogin } = require("../controllers/auth");

router
  .route("/")
  .post(validateRegister, validationErrors, register)
  .get(getUsers);

  router.route("/subscribe").put(requireLogin, addSubscription, addSubscriber);
  router
    .route("/unsubscribe")
    .put(requireLogin, removeSubscription, removeSubscriber);
  

router
  .route("/:userId")
  .get(getUser)
  .put(requireLogin, updateUser)
  .delete(requireLogin, deleteUser);



module.exports = router;
