import { Op } from "sequelize";

export class UserRepository {
  constructor(db) {
    this.db = db;
  }
}

UserRepository.prototype.findUser = async function (params) {
  console.log(params);
  this.user = await this.db.User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      [Op.or]: [
        { role: params.role ? params.role : "" },
        { firstName: params.firstName ? params.firstName : "" },
        { phoneNumber: params.phoneNumber ? params.phoneNumber : "" },
      ],
    },
  });
  return this.user.dataValues;
};

UserRepository.prototype.findUserById = async function (id) {
  this.user = await this.db.User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      [Op.or]: [{ id: id }],
    },
  });
  return this.user;
};

UserRepository.prototype.findAllUsers = async function () {
  this.listUsers = await this.db.User.findAll({
    attributes: { exclude: ["password"] },
    order: [["firstName", "DESC"]],
  });
  return this.listUsers;
};

UserRepository.prototype.findAllUsersByPagination = async function (
  offset,
  limit
) {
  this.listUsers = await this.db.User.findAndCountAll({
    attributes: { exclude: ["password"] },
    order: [["firstName", "DESC"]],
    offset: offset,
    limit: limit,
  });
  return this.listUsers;
};
