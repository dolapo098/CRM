import { UserService } from "./user.mjs";
import { userRepository } from "../data-access/index.mjs";
import { Tokenization, FieldValidator, Pagination } from "../_helper/index.mjs";

export const userService = new UserService(
  FieldValidator,
  userRepository,
  Tokenization,
  Pagination
); //Using the DI approach to inject the validation, data access, Token and Pagination objects
