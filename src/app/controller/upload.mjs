import { errorHandler } from "../_helper/index.mjs";

export class UploadController {
  constructor(service, logger, resType) {
    this.service = service;
    this.logger = logger;
    this.resType = resType;
  }
}

UploadController.prototype.fileUpload = function (httpRequest) {
  try {
    // const data = await this.service.authenticate(httpRequest.body); // The method contains the flow logic for authentication
    const data = httpRequest.files;
    console.log(data);
    const response = this.resType.responseIsJson(data); //The method used for returning  response to the view
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger); //The method used for logging and sending all error specific types included in the applicati
  }
};
