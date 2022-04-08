import {
  MissingResourceError,
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
  roles,
} from "../_helper/index.mjs";
import { status, state } from "../_helper/index.mjs";

export class ComplaintService {
  constructor(
    fieldValidator,
    userRepository,
    salesInvoiceRepository,
    complaintsRepository,
    pagination,
    workFlowContext
  ) {
    this._fieldValidator = fieldValidator;
    this._userRepository = userRepository;
    this._salesInvoiceRepository = salesInvoiceRepository;
    this._complaintsRepository = complaintsRepository;
    this._pagination = pagination;
    this._workFlowContext = workFlowContext;
  }
}

//The method to initiate a complaints
ComplaintService.prototype.makeComplaints = async function (params) {
  let reqFields = ["attachmentId", "initiator", "comment", "salesInvoiceId"];
  this._fieldValidator.validateRequiredFields(reqFields, params);

  const user = await this._userRepository.findUserById(params.initiator);
  if (user === null) {
    const message = "user does not exist ";
    throw new UnauthorizedError(message);
  }
  const invoice = await this._salesInvoiceRepository.findInvoiceById(
    params.salesInvoiceId
  );

  if (invoice === null) {
    const message = "no record found for sales ";
    throw new MissingResourceError(message);
  }

  if (invoice.dataValues.clientId !== user.dataValues.id) {
    const message = "access denied";
    throw new ForbiddenError(message);
  }

  if (user.dataValues.role === roles.client) {
    params.state = state.initiateRequest;
    params.status = status.awaitingClientEngagementOfficer;
  }

  //The method to save the request to the database , reger tp the Complaints Repository Class
  let savedRequest = await this._complaintsRepository.createComplaints(params);
  return savedRequest.dataValues;
};

//The method to review all type of request
ComplaintService.prototype.reviewRequest = async function (params) {
  let reqFields = ["state", "reviewedBy", "comment", "id"];
  this._fieldValidator.validateRequiredFields(reqFields, params);

  const user = await this._userRepository.findUserById(params.reviewedBy);
  if (user === null) {
    const message = "user does not exist ";
    throw new MissingResourceError(message);
  }

  const complaint = await this._complaintsRepository.findComplaintsById(
    params.id
  );

  if (complaint === null) {
    const message = "item does not exist ";
    throw new MissingResourceError(message);
  }

  if (complaint.dataValues.state === params.state) {
    console.log("i entered here");
    throw new ValidationError(" request is presently awaiting a review");
  }

  //the method to change the behaviour of the request based on several states of the approval types
  //refer to the complaints workflow class in the index.mjs file
  const newParams = this._workFlowContext.manageRequest({
    ...complaint.dataValues,
    ...params,
  });

  //https://sequelize.org/docs/v6/core-concepts/model-instances/  to update the records in the database
  complaint.set(newParams);
  let result = await complaint.save();
  return result.dataValues;
};

ComplaintService.prototype.getComplaintById = async function (params) {
  const result = await this._complaintsRepository.findComplaintsById(
    parseInt(params)
  );

  if (result === null) {
    const message = "record does not exist ";
    throw new MissingResourceError(message);
  }
  return result;
};

ComplaintService.prototype.getAllComplaints = async function (params) {
  let reqFields = ["page", "pageSize"];
  this._fieldValidator.validateRequiredFields(reqFields, params);
  const { limit, offset } = this._pagination.getPagination(
    parseInt(params.page),
    parseInt(params.pageSize)
  );

  const result = await this._complaintsRepository.complaintsByPagination(
    params,
    offset,
    limit
  );

  if (result === null) {
    const message = "record does not exist ";
    throw new MissingResourceError(message);
  }

  let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(dataItems, params.page, limit);
  return { data: dataItems, metaData: pagObj };
};
