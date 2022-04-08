import { UserRepository } from "./userRepository.mjs";
import { ComplaintsRepository } from "./complaintsRepository.mjs";
import { SalesInvoiceRepository } from "./salesInvoiceRepository.mjs";
import db from "../db/models/index.js"; //The database object from sequelize ORM  https://sequelize.org/v6/manual/model-basics.html
const userRepository = new UserRepository(db); //Using DI approach to inject db object to the repository class
const salesRepository = new SalesInvoiceRepository(db); //Using DI approach to inject db object to the repository class
const complaintsRepository = new ComplaintsRepository(db); //Using DI approach to inject db object to the repository class
export { userRepository, salesRepository, complaintsRepository };
