import {
  MissingResourceError,
  ForbiddenError,
  UnauthorizedError,
  UniqueConstraintError,
  ValidationError,
  roles,
  state,
  last_action,
  generateUniqueId,
} from "../_helper/index.mjs";

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

  const listInvoice = await this._complaintsRepository.findAllComplaints();
  //check if the sales invoice id exist in the complaints table
  listInvoice.forEach((val) => {
    if (val.salesInvoiceId === params.salesInvoiceId) {
      throw new UniqueConstraintError(
        `The request with sales invoice no : ${params.salesInvoiceId} has been logged  already `
      );
    }
  });

  if (invoice.clientId !== user.id) {
    const message = "access denied";
    throw new ForbiddenError(message);
  }

  if (user.role === roles.client) {
    params.state = state.awaitingClientEngagementOfficer;
    params.last_action = last_action.complaints_initiated;
  }

  // generate a unique id
  params.id = generateUniqueId(5).toUpperCase();
  //The method to save the request to the database , reger tp the Complaints Repository Class
  let savedRequest = await this._complaintsRepository.createComplaints(params);
  return savedRequest.dataValues;
};

//The method to review all type of request
ComplaintService.prototype.reviewRequest = async function (params) {
  let reqFields = ["state", "last_reviewed_by", "id"];
  this._fieldValidator.validateRequiredFields(reqFields, params);

  const user = await this._userRepository.findUserById(params.last_reviewed_by);
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

  if (complaint.state === "complete") {
    throw new ValidationError("Work flow cycle is completed");
  }
  if (complaint.state === params.state) {
    throw new ValidationError(" request is presently awaiting a review");
  }

  const { id, ...updateProps } = params;
  //the method to change the behaviour of the request based on several states of the approval types
  //refer to the complaints workflow class in the index.mjs file
  const newParams = this._workFlowContext.manageRequest({
    last_action: complaint.last_action,
    ...updateProps,
  });
  // return newParams;
  const result = await this._complaintsRepository.updateComplaints(
    newParams,
    id
  );
  return result.dataValues;
};

ComplaintService.prototype.getComplaintById = async function (params) {
  const result = await this._complaintsRepository.findComplaintsById(params);

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
  let pagObj = this._pagination.getPagingData(
    result.count,
    parseInt(params.page),
    limit
  );
  return { items: dataItems, metaData: pagObj };
};

ComplaintService.prototype.complaintsByInitiator = async function (params) {
  let reqFields = ["page", "initiator", "pageSize"];

  this._fieldValidator.validateRequiredFields(reqFields, params);

  const { limit, offset } = this._pagination.getPagination(
    parseInt(params.page),
    parseInt(params.pageSize)
  );

  const result = await this._complaintsRepository.complaintsByInitiator(
    params,
    offset,
    limit
  );

  if (result === null) {
    const message = "record does not exist ";
    throw new MissingResourceError(message);
  }

  // let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(
    result.count,
    parseInt(params.page),
    limit
  );
  return { items: result.rows, metaData: pagObj };
};

ComplaintService.prototype.getAllCompleteRequest = async function (params) {
  let reqFields = ["page", "pageSize"];

  this._fieldValidator.validateRequiredFields(reqFields, params);

  const { limit, offset } = this._pagination.getPagination(
    parseInt(params.page),
    parseInt(params.pageSize)
  );

  const result = await this._complaintsRepository.completeWorkFlow(
    params,
    offset,
    limit,
    state.complete
  );

  if (result === null) {
    const message = "record does not exist ";
    throw new MissingResourceError(message);
  }

  // let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(
    result.count,
    parseInt(params.page),
    limit
  );
  return { items: result.rows, metaData: pagObj };
};

ComplaintService.prototype.clientOfficerViewComplaints = async function (
  params
) {
  let result;
  let reqFields = ["page", "pageSize"];

  this._fieldValidator.validateRequiredFields(reqFields, params);
  const { limit, offset } = this._pagination.getPagination(
    parseInt(params.page),
    parseInt(params.pageSize)
  );

  result = await this._complaintsRepository.complaintsByPagination(
    params,
    offset,
    limit,
    state.awaitingClientEngagementOfficer
  );

  if (result === null) {
    const message = "record does not exist ";
    throw new MissingResourceError(message);
  }

  // let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(
    result.count,
    parseInt(params.page),
    limit
  );
  return { items: result.rows, metaData: pagObj };
};

ComplaintService.prototype.foodOfficerViewComplaints = async function (params) {
  let reqFields = ["page", "pageSize"];

  this._fieldValidator.validateRequiredFields(reqFields, params);
  const { limit, offset } = this._pagination.getPagination(
    parseInt(params.page),
    parseInt(params.pageSize)
  );

  const result = await this._complaintsRepository.complaintsByPagination(
    params,
    offset,
    limit,
    state.awaitngFoodProcessingOfficer
  );

  if (result === null) {
    const message = "record does not exist ";
    throw new MissingResourceError(message);
  }

  // let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(
    result.count,
    parseInt(params.page),
    limit
  );
  return { items: result.rows, metaData: pagObj };
};

ComplaintService.prototype.foodTasterViewComplaints = async function (params) {
  let reqFields = ["page", "pageSize"];

  this._fieldValidator.validateRequiredFields(reqFields, params);
  const { limit, offset } = this._pagination.getPagination(
    parseInt(params.page),
    parseInt(params.pageSize)
  );

  const result = await this._complaintsRepository.complaintsByPagination(
    params,
    offset,
    limit,
    state.awaitingFoodTaster
  );

  if (result === null) {
    const message = "record does not exist ";
    throw new MissingResourceError(message);
  }

  // let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(
    result.count,
    parseInt(params.page),
    limit
  );
  return { items: result.rows, metaData: pagObj };
};
