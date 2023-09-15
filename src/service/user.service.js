const db = require("../../models");
const user = db.users;

exports.createUser = async payload => {
  try {
    let findUser = await user.findOne({ where: { name: payload.name } });

    if (findUser) throw new Error("User already exsist");
    return await user.create(payload);
  } catch (error) {
    throw new Error(error);
  }
};
