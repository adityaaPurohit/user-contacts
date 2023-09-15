const service = require("../service/user.service");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    let { body } = req;
    const errors = validationResult(req);

    if (!errors.isEmpty()) res.status(422).jsonp(errors.array());
    const user = await service.createUser(body);

    res.status(201).send({
      status_code: 201,
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    res.status(400).send({
      status_code: 400,
      message: error.message
    });
  }
};
