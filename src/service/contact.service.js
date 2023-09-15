const db = require("../../models");
const contact = db.contacts;
const { sign, verify } = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
exports.createContact = async payload => {
  try {
    let findContact = await contact.findOne({
      where: { name: payload.name, userId: payload.userId }
    });

    let jwt = sign(payload.number, process.env.SECRET_KEY);
    payload.number = jwt;
    if (findContact) throw new Error("contact already exsist");
    return await contact.create(payload);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getContactsbyNumber = async payload => {
  try {
    let jwt = sign(payload.number, process.env.SECRET_KEY);
    let findContact = await contact.findAll({
      where: { number: jwt }
    });
    if (findContact && findContact.length > 0) {
      let res = {
        name: findContact[0].name,
        commonUser: []
      };
      await findContact.forEach(element => {
        res.commonUser.push(element.userId);
      });
      return res;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.getContactsByuserId = async payload => {
  try {
    let query = {};

    if (payload.searchText) {
      let searchResult = await contact.findAndCountAll({
        where: {
          name: { [Op.regexp]: payload.searchText }
        }
      });
      if (searchResult && searchResult.rows.length) {
        await searchResult.rows.forEach(element => {
          element.number = verify(element.number, process.env.SECRET_KEY);
        });
      }
      return searchResult;
    }
    if (payload.pageSize) {
      query.limit = parseInt(payload.pageSize);
    }
    if (payload.page) {
      query.offset = (payload.page - 1) * payload.pageSize;
    }
    query.where = { userId: payload.user_id };

    let findContact = await contact.findAndCountAll(query);
    if (findContact && findContact.rows.length) {
      await findContact.rows.forEach(element => {
        element.number = verify(element.number, process.env.SECRET_KEY);
      });
    }
    // else{
    //   return [];
    // }
    return findContact;
  } catch (error) {
    throw new Error(error);
  }
};
