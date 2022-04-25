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
    id: params.id,
    initiator: params.initiator,
    attachmentId: params.attachmentId,
    salesInvoiceId: params.salesInvoiceId,
    comment: params.comment,
    last_action: params.last_action,
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
    last_action: params.last_action,
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
    order: [["createdAt", "ASC"]],
    where: {
      [Op.or]: [
        {
          salesInvoiceId: params.salesInvoiceId ? params.salesInvoiceId : null,
        },
        { initiator: params.initiator ? params.initiator : null },
        { closedBy: params.closedBy ? params.closedBy : null },
        { reviewedBy: params.reviewedBy ? params.reviewedBy : null },
      ],
    },
  });
  return result;
};

//get all complaints by pagination
ComplaintsRepository.prototype.complaintsByPagination = async function (
  params,
  offset,
  limit,
  status = null
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
      order: [["createdAt", "ASC"]],
      where: {
        status: status,
        [Op.or]: [
          {
            initiator: params.salesInvoiceId ? params.salesInvoiceId : null,
          },
          { initiator: params.initiator ? params.initiator : null },
          { closedBy: params.closedBy ? params.closedBy : null },
          {
            reviewedBy: params.reviewedBy ? params.reviewedBy : null,
          },
        ],
      },
      offset: offset,
      limit: limit,
    });
    return result;
  } else {
    result = await this.db.Complaints_Workflow.findAndCountAll({
      order: [["createdAt", "ASC"]],
      offset: offset,
      limit: limit,
      where: {
        status: status,
      },
    });
    return result;
  }
};

//get all complaints by pagination
ComplaintsRepository.prototype.complaintsByInitiator = async function (
  params,
  offset,
  limit,
  status = null
) {
  let result;

  if (params.initiator) {
    //https://sequelize.org/v6/manual/model-querying-basics.html
    result = await this.db.Complaints_Workflow.findAndCountAll({
      order: [["createdAt", "ASC"]],
      where: {
        initiator: params.initiator,
      },
      offset: offset,
      limit: limit,
    });
    return result;
  }
};

//get a complaint by id and update the new fields
ComplaintsRepository.prototype.updateComplaints = async function (params, id) {
  //https://sequelize.org/v6/manual/model-querying-basics.html
  let result = await this.db.Complaints_Workflow.findOne({
    where: {
      [Op.or]: [{ id: id }],
    },
  });

  result.set(params);
  await result.save();
  return result;
};
