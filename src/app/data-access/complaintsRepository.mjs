import { Op } from "sequelize";

export class ComplaintsRepository {
  constructor(db) {
    this.db = db;
  }
}

ComplaintsRepository.prototype.createComplaints = async function (params) {
  this.complaints = await this.db.Compliants_Workflow.create({
    initiator: params.initiator,
    attachmentId: params.attachmentId,
    salesInvoiceId: params.salesInvoiceId,
    comment: params.comment,
  });
  return this.complaints;
};

ComplaintsRepository.prototype.reviewComplaints = async function (params) {
  this.complaints = await this.db.Compliants_Workflow.create({
    initiator: params.initiator,
    attachmentId: params.attachmentId,
    salesInvoiceId: params.salesInvoiceId,
    comment: params.comment,
    reviewedBy: params.reviewedBy,
    closedBy: params.closedBy,
  });
  return this.complaints;
};

ComplaintsRepository.prototype.findComplaintsById = async function (id) {
  this.complaint = await this.db.Compliants_Workflow.findOne({
    where: {
      [Op.or]: [{ id: id }],
    },
  });
  return this.complaint;
};

ComplaintsRepository.prototype.findAllComplaints = async function (params) {
  this.listComplaints = await this.db.Compliants_Workflow.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.or]: [
        { salesInvoiceId: params.salesInvoiceId ? params.salesInvoiceId : "" },
        { initiator: params.initiator ? params.initiator : "" },
        { closedBy: params.closedBy ? params.closedBy : "" },
        { reviewedBy: params.reviewedBy ? params.reviewedBy : "" },
      ],
    },
  });
  return this.listComplaints;
};

ComplaintsRepository.prototype.complaintsByPagination = async function (
  params,
  offset,
  limit
) {
  this.listComplaints = await this.db.Compliants_Workflow.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.or]: [
        { salesInvoiceId: params.salesInvoiceId ? params.salesInvoiceId : "" },
        { initiator: params.initiator ? params.initiator : "" },
        { closedBy: params.closedBy ? params.closedBy : "" },
        { reviewedBy: params.reviewedBy ? params.reviewedBy : "" },
      ],
    },
    offset: offset,
    limit: limit,
  });
  return this.listComplaints;
};
