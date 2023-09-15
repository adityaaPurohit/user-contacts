const { check } = require("express-validator");

exports.createUser = () => {
  return [[check("name", "name should not be empty!!").isLength({ min: 1 })]];
};

exports.createContach = () => {
  return [
    [check("name", "name should not be empty!!").isLength({ min: 1 })],
    [
      check("number", "number should not be empty!!")
        .not()
        .isEmpty()
    ],
    [
      check("userId", "userId should not be empty!!")
        .isLength({ min: 1 })
        .not()
        .isEmpty()
    ]
  ];
};
