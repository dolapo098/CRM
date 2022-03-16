import { MissingResourceError } from "../_helper/index.mjs";

export class UserService {
  constructor(fieldValidator, userRepository, tokenization, pagination) {
    this._fieldValidator = fieldValidator;
    this._userRepository = userRepository;
    this._tokenization = tokenization;
    this._pagination = pagination;
  }
}

UserService.prototype.authenticate = async function (params) {
  let authResult = {};
  let reqFields = ["firstName", "password"];
  this._fieldValidator.validateRequiredFields(reqFields, params);
  const user = await this._userRepository.findUser(params);
  if (user === null) {
    const message = "user does not exist ";
    throw new MissingResourceError(message);
  }

  const tokenResult = this._tokenization.genToken({
    id: user.id,
    role: user.role,
  });
  if (user !== null && tokenResult !== null) {
    authResult["message"] = "Login Successful";
    authResult["tokenResult"] = tokenResult;
    return authResult;
  }
};

UserService.prototype.getUser = async function (params) {
  const result = await this._userRepository.findUser(params);
  if (result === null) {
    const message = "user does not exist ";
    throw new MissingResourceError(message);
  }
  return result;
};

UserService.prototype.getAllUsers = async function (params) {
  let reqFields = ["page", "pageSize"];
  this._fieldValidator.validateRequiredFields(reqFields, params);
  const { limit, offset } = this._pagination.getPagination(
    parseInt(params.page),
    parseInt(params.pageSize)
  );
  const result = await this._userRepository.findAllUsersByPagination(
    offset,
    limit
  );
  let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(dataItems, params.page, limit);
  return { data: dataItems, metaData: pagObj };
};
