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
  });
  return this.invoice;
};

SalesInvoiceRepository.prototype.findAllInvoice = async function () {
  this.listInvoices = await this.db.SalesInvoice.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.or]: [
        { productId: params.productId ? params.productId : "" },
        { clientId: params.clientId ? params.clientId : "" },
        { amount: params.amount ? params.amount : "" },
      ],
    },
  });
  return this.listInvoices;
};

SalesInvoiceRepository.prototype.findAllUsersByPagination = async function (
  offset,
  limit
) {
  this.listInvoices = await this.db.SalesInvoice.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.or]: [
        { productId: params.productId ? params.productId : "" },
        { clientId: params.clientId ? params.clientId : "" },
        { amount: params.amount ? params.amount : "" },
      ],
    },
    offset: offset,
    limit: limit,
  });
  return this.listInvoices;
};
