import { MissingResourceError } from "../_helper/index.mjs";

// The User service contains the control logic for handling any specific data inpputs
export class UserService {
  constructor(fieldValidator, userRepository, tokenization, pagination) {
    this._fieldValidator = fieldValidator;
    this._userRepository = userRepository;
    this._tokenization = tokenization;
    this._pagination = pagination;
  }
}

//The contol flow used for authentication
UserService.prototype.authenticate = async function (params) {
  let authResult = {};
  let reqFields = ["firstName", "password"];

  //validate the firstName and password properties from the request objects
  this._fieldValidator.validateRequiredFields(reqFields, params);
  //find a user by firstName  from the data source
  const user = await this._userRepository.findUser(params);

  if (user === null) {
    const message = "login failed ";
    throw new MissingResourceError(message);
  }

  // The method uses a jsonwebtoken dependency as specified in the helper folder
  const tokenResult = this._tokenization.genToken({
    id: user.id,
    role: user.role,
  });
  if (user !== null && tokenResult !== null) {
    authResult.message = "Login Successful";
    authResult.tokenResult = tokenResult;
    authResult.role = user.role;
    authResult.user = user.firstName;
    return authResult;
  }
};

//the control flow used to get a user
UserService.prototype.getUser = async function (params) {
  //find a user by firstName  from the data source
  const result = await this._userRepository.findUser(params);
  if (result === null) {
    const message = "user does not exist ";
    throw new MissingResourceError(message);
  }
  return result.dataValues;
};

//the contol used to get all users
UserService.prototype.getAllUsers = async function (params) {
  let reqFields = ["page", "pageSize"];

  //validation of the page and pageSize properties from the queries returned from the request objects
  this._fieldValidator.validateRequiredFields(reqFields, params);

  //the method used to prepare pagination for a list of user as specified in the helper folder
  const { limit, offset } = this._pagination.getPagination(
    parseInt(params.page),
    parseInt(params.pageSize)
  );

  //method to get all users with pagination properties from a data source
  const result = await this._userRepository.findAllUsersByPagination(
    params.filterText,
    offset,
    limit
  );
  let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(dataItems, params.page, limit);
  return { data: dataItems, metaData: pagObj };
};
