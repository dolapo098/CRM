import { Op } from "sequelize";

export class SalesInvoiceRepository {
  constructor(db) {
    this.db = db;
  }
}

SalesInvoiceRepository.prototype.findInvoiceById = async function (id) {
  this.invoice = await this.db.SalesInvoice.findOne({
    where: {
      [Op.or]: [{ id: id }],
    },
    raw: true,
    nest: true,
  });
  return this.invoice;
};

SalesInvoiceRepository.prototype.findAllInvoice = async function () {
  this.listInvoices = await this.db.SalesInvoice.findAll({
    order: [["createdAt", "ASC"]],
    where: {
      [Op.or]: [
        { productId: params.productId ? params.productId : "" },
        { clientId: params.clientId ? params.clientId : "" },
        { amount: params.amount ? params.amount : "" },
      ],
    },
    raw: true,
    nest: true,
  });
  return this.listInvoices;
};

SalesInvoiceRepository.prototype.findAllUsersByPagination = async function (
  offset,
  limit
) {
  this.listInvoices = await this.db.SalesInvoice.findAndCountAll({
    order: [["createdAt", "ASC"]],
    where: {
      [Op.or]: [
        { productId: params.productId ? params.productId : "" },
        { clientId: params.clientId ? params.clientId : "" },
        { amount: params.amount ? params.amount : "" },
      ],
    },
    raw: true,
    nest: true,
    offset: offset,
    limit: limit,
  });
  return this.listInvoices;
};
