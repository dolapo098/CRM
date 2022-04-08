import { Op } from "sequelize"; //https://sequelize.org/master/manual/model-querying-basics.html#operators   symbol operators that can be used for to create more complex

// The components that encapsulate the logic required to access data sources for all specific Complaints operations in the database
export class ComplaintsRepository {
  constructor(db) {
    this.db = db; //The object used to organise data element for a user  using sequelize
  }
}

//createa complaints
ComplaintsRepository.prototype.createComplaints = async function (params) {
  //https://sequelize.org/v6/manual/model-querying-basics.html
  const result = await this.db.Complaints_Workflow.create({
    initiator: params.initiator,
    attachmentId: params.attachmentId,
    salesInvoiceId: params.salesInvoiceId,
    comment: params.comment,
    status: params.status,
    state: params.state,
  });
  return result;
};

//modify a complaints byupdate
ComplaintsRepository.prototype.reviewComplaints = async function (params) {
  //https://sequelize.org/v6/manual/model-querying-basics.html
  const result = await this.db.Complaints_Workflow.create({
    initiator: params.initiator,
    attachmentId: params.attachmentId,
    salesInvoiceId: params.salesInvoiceId,
    comment: params.comment,
    reviewedBy: params.reviewedBy,
    closedBy: params.closedBy,
    state: params.state,
    status: params.status,
  });
  return result;
};

//get a complaint by id
ComplaintsRepository.prototype.findComplaintsById = async function (id) {
  //https://sequelize.org/v6/manual/model-querying-basics.html
  const result = await this.db.Complaints_Workflow.findOne({
    where: {
      [Op.or]: [{ id: id }],
    },
  });
  return result;
};

//get all complaints
ComplaintsRepository.prototype.findAllComplaints = async function (params) {
  //https://sequelize.org/v6/manual/model-querying-basics.html
  const result = await this.db.Complaints_Workflow.findAll({
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
  return result;
};

//get all complaints by pagination
ComplaintsRepository.prototype.complaintsByPagination = async function (
  params,
  offset,
  limit
) {
  let result;

  if (
    "salesInvoiceId" in params ||
    "initiator" in params ||
    "closedBy" in params ||
    "reviewedBy" in params
  ) {
    //https://sequelize.org/v6/manual/model-querying-basics.html
    result = await this.db.Complaints_Workflow.findAndCountAll({
      order: [["createdAt", "DESC"]],
      where: {
        [Op.or]: [
          { initiator: params.initiator ? parseInt(params.initiator) : 0 },
          { closedBy: params.closedBy ? parseInt(params.closedBy) : null },
          {
            reviewedBy: params.reviewedBy ? parseInt(params.reviewedBy) : null,
          },
        ],
      },
      offset: offset,
      limit: limit,
    });
    return result;
  } else {
    result = await this.db.Complaints_Workflow.findAndCountAll({
      order: [["createdAt", "DESC"]],
      offset: offset,
      limit: limit,
    });
    return result;
  }
};
