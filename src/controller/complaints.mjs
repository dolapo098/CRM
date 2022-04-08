import { errorHandler } from "../_helper/index.mjs";

export class ComplaintsController {
  constructor(service, logger, resType) {
    this.service = service;
    this.logger = logger;
    this.resType = resType;
  }
}

ComplaintsController.prototype.makeComplaints = async function (httpRequest) {
  try {
    const data = await this.service.makeComplaints({
      initiator: httpRequest.loggedinuser.id,
      ...httpRequest.body,
    });
    const response = this.resType.responseIsJson(data);
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger);
  }
};

ComplaintsController.prototype.manageRequest = async function (httpRequest) {
  try {
    const data = await this.service.reviewRequest({
      reviewedBy: httpRequest.loggedinuser.id,
      ...httpRequest.body,
      id: httpRequest.params.id,
    });
    const response = this.resType.responseIsJson(data);
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger);
  }
};

ComplaintsController.prototype.getComplaintById = async function (httpRequest) {
  try {
    const service = this.service;
    const user = await service.getComplaintById(httpRequest.params.id);
    const response = this.resType.responseIsJson(user);
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger);
  }
};

ComplaintsController.prototype.getAllComplaints = async function (httpRequest) {
  try {
    const data = await this.service.getAllComplaints(httpRequest.query);
    const response = this.resType.responseIsJson(data);
    return response;
  } catch (err) {
    throw errorHandler(err, this.logger);
  }
};
