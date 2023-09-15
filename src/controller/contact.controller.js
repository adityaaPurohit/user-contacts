const service = require("../service/contact.service");
const { validationResult } = require("express-validator");

exports.createContact = async (req, res) => {
  try {
    let { body } = req;
    const errors = validationResult(req);

    if (!errors.isEmpty()) res.status(422).jsonp(errors.array());
    const user = await service.createContact(body);
    if (user) {
      res.status(201).send({
        success: true,
        message: "data saved successfully"
      });
    } else {
      throw new Error("Something went wrong!!");
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
};

exports.getUsersWithSameNumber = async (req, res) => {
  try {
    let { query } = req;
    const users = await service.getContactsbyNumber(query);
    res.status(201).send({
      success: true,
      message: "data saved successfully",
      data: users
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
};

exports.getUsersWithUserId = async (req, res) => {
  try {
    let { query } = req;
    const users = await service.getContactsByuserId(query);
    res.status(201).send({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
};
