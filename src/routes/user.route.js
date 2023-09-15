const router = require("express").Router();
const controller = require("../controller/user.controller");
const validator = require("../utils/validators");

router.post("/create-user", validator.createUser(), controller.createUser);

module.exports = router;
