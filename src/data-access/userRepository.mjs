import { Op } from "sequelize"; //https://sequelize.org/master/manual/model-querying-basics.html#operators   symbol operators that can be used for to create more complex

// The components that encapsulate the logic required to access data sources for all specific User operations in the database
export class UserRepository {
  constructor(db) {
    this.db = db; //The object used to organise data element for a user  using sequelize
  }
}

//Get a user by firstname or phoneNumber from the data source
UserRepository.prototype.findUser = async function (params) {
  //https://sequelize.org/v6/manual/model-querying-basics.html
  const user = await this.db.User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      [Op.or]: [
        {
          firstName: params.firstName ? params.firstName : "",
        },
        { phoneNumber: params.phoneNumber ? params.phoneNumber : "" },
      ],
    },
    raw: true,
    nest: true,
  });
  return user;
};

//Get a user by the id propertyfrom a data source
UserRepository.prototype.findUserById = async function (id) {
  //https://sequelize.org/v6/manual/model-querying-basics.html
  const result = await this.db.User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      [Op.or]: [{ id: id }],
    },
    raw: true,
    nest: true,
  });
  return result;
};

// Get all users from the data source
UserRepository.prototype.findAllUsers = async function () {
  //https://sequelize.org/v6/manual/model-querying-basics.html
  const result = await this.db.User.findAll({
    attributes: { exclude: ["password"] },
    raw: true,
    nest: true,
  });
  return result;
};

// //Get all users from the data source with linit and count properties for pagination
// UserRepository.prototype.findAllUsersByPagination = async function (
//   offset,
//   limit
// ) {
//   //https://sequelize.org/v6/manual/model-querying-basics.html
//   const result = await this.db.User.findAndCountAll({
//     attributes: { exclude: ["password"] },
//     offset: offset,
//     limit: limit,
//   });
//   return result;
// };

//Get all users from the data source with linit and count properties for pagination
UserRepository.prototype.findAllUsersByPagination = async function (
  params,
  offset,
  limit
) {
  let result;
  if (params) {
    //https://sequelize.org/v6/manual/model-querying-basics.html
    result = await this.db.User.findAndCountAll({
      order: [["createdAt", "ASC"]],
      where: {
        [Op.or]: [
          {
            firstName: params,
          },
          { phoneNumber: params },
        ],
      },
      raw: true,
      nest: true,
      offset: offset,
      limit: limit,
    });
    return result;
  } else {
    result = await this.db.User.findAndCountAll({
      order: [["createdAt", "ASC"]],
      raw: true,
      nest: true,
      offset: offset,
      limit: limit,
    });
    return result;
  }
};
