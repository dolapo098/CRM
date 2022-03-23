import { MissingResourceError, ForbiddenError } from "../_helper/index.mjs";

export class ComplaintService {
  constructor(
    fieldValidator,
    userRepository,
    salesInvoiceRepository,
    complaintsRepository,
    pagination
  ) {
    this._fieldValidator = fieldValidator;
    this._userRepository = userRepository;
    this._salesInvoiceRepository = salesInvoiceRepository;
    this._complaintsRepository = complaintsRepository;
    this._pagination = pagination;
  }
}

ComplaintService.prototype.initiateRequest = async function (params) {
  let reqFields = ["attachmentId", "comment", "salesInvoiceId"];
  this._fieldValidator.validateRequiredFields(reqFields, params);
  const user = await this._userRepository.findUserById(params);
  if (user === null) {
    const message = "user does not exist ";
    throw new MissingResourceError(message);
  }

  const invoice = await this._salesInvoiceRepository.findInvoiceById(params);
  if (invoice === null) {
    const message = "item does not exist ";
    throw new MissingResourceError(message);
  }

  if (invoice.clientId !== user.id) {
    const message = "request mismatch";
    throw new ForbiddenError(message);
  }

  let savedRequest = await this._complaintsRepository.createComplaints(params);
  return savedRequest;
};

ComplaintService.prototype.reviewRequest = async function (params) {};

ComplaintService.prototype.getComplaintById = async function (params) {
  const result = await this._complaintsRepository.findComplaintsById(params);
  if (result === null) {
    const message = "user does not exist ";
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
  let dataItems = this._pagination.mapRowsDataValues(result.rows);
  let pagObj = this._pagination.getPagingData(dataItems, params.page, limit);
  return { data: dataItems, metaData: pagObj };
};
