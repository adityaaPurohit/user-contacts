const router = require("express").Router();
const controller = require("../controller/contact.controller");
const validator = require("../utils/validators");

router.post(
  "/create-contact",
  validator.createContach(),
  controller.createContact
);
router.get("/get-user-by-number", controller.getUsersWithSameNumber);
router.get("/get-user-by-userId", controller.getUsersWithUserId);

module.exports = router;
