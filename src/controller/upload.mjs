import { errorHandler } from "../_helper/index.mjs";

export class UploadController {
  constructor(service, logger, resType) {
    this.service = service;
    this.logger = logger;
    this.resType = resType;
  }
}

// The contoller method for file upload
UploadController.prototype.fileUpload = function (httpRequest) {
  try {
    const data = this.service.upload(httpRequest.files);
    const response = this.resType.responseIsJson(data); //The method used for returning  response to the view
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger); //The method used for logging and sending all error specific types included in the applicati
  }
};

UploadController.prototype.download = async function (httpRequest) {
  try {
    // console.log(req.files);
    const data = await this.service.download(httpRequest.query.filePath);
    const response = this.resType.contentDisposition(
      data.filename,
      data.mimetype,
      data.filePath
    ); //The method used for returning  response to the view
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger); //The method used for logging and sending all error specific types included in the applicati
  }
};
