import { errorHandler } from "../_helper/index.mjs";

export class ComplaintsController {
  constructor(service, logger, resType) {
    this.service = service;
    this.logger = logger;
    this.resType = resType;
  }
}

ComplaintsController.prototype.initiateRequest = async function (httpRequest) {
  try {
    const data = await this.service.authenticate(httpRequest.body);
    const response = this.resType.responseIsJson(data);
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger);
  }
};

UserController.prototype.getUser = async function (httpRequest) {
  try {
    const service = this.service;
    const user = await service.getUser(httpRequest.query);
    const response = this.resType.responseIsJson(user);
    return response;
  } catch (err) {
    const logger = this.logger;
    errorHandler(err, logger);
  }
};

UserController.prototype.getAllUsers = async function (httpRequest) {
  try {
    const service = this.service;
    const data = await service.getAllUsers(httpRequest.query);
    const response = this.resType.responseIsJson(data);
    return response;
  } catch (err) {
    const logger = this.logger;
    errorHandler(err, logger);
  }
};
