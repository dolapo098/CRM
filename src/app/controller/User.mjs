import { errorHandler } from "../_helper/index.mjs";

// A User controler class that update both the models and views with response based on the type of request
export class UserController {
  constructor(service, logger, resType) {
    this.service = service;
    this.logger = logger;
    this.resType = resType;
  }
}

// The contoller method for authentication
UserController.prototype.authenticaton = async function (httpRequest) {
  try {
    const data = await this.service.authenticate(httpRequest.body); // The method contains the flow logic for authentication
    const response = this.resType.responseIsJson(data); //The method used for returning  response to the view
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger); //The method used for logging and sending all error specific types included in the applicati
  }
};

//The controller method for used to fetch a  user from the application
UserController.prototype.getUser = async function (httpRequest) {
  try {
    const service = this.service;
    const user = await service.getUser(httpRequest.query); // The method contains the flow logic for authentication
    const response = this.resType.responseIsJson(user); //The method used for returning  response to the view
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger); //The method used for logging and sending all error specific types included in the applicati
  }
};

//The controler method used to get all users in the application
UserController.prototype.getAllUsers = async function (httpRequest) {
  try {
    const service = this.service;
    const data = await service.getAllUsers(httpRequest.query); // The method contains the flow logic for authentication
    const response = this.resType.responseIsJson(data); //The method used for returning  response to the view
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger); //The method used for logging and sending all error specific types included in the applicati
  }
};
