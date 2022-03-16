import { UserRepository } from "./userRepository.mjs";
import db from "../db/models/index.js"; //The database object from sequelize ORM

export const userRepository = new UserRepository(db); //Using DI approach to inject db object to the repository class
