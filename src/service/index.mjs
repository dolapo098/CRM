import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import { UserService } from "./user.mjs";
import { ComplaintService } from "./complaints.mjs";
import { FileUploadService } from "./fileUpload.mjs";
import { ComplaintsWorkFlow } from "../workflows/workflow.mjs";
import {
  userRepository,
  complaintsRepository,
  salesRepository,
} from "../data-access/index.mjs";
import { Tokenization, FieldValidator, Pagination } from "../_helper/index.mjs";

//The Tokenization , FieldValidator and Pagination are modules injected intothe service class
const userService = new UserService(
  FieldValidator,
  userRepository,
  Tokenization,
  Pagination
); //Using the DI approach to inject the validation, data access, Token and Pagination objects

const complaintsService = new ComplaintService(
  FieldValidator,
  userRepository,
  salesRepository,
  complaintsRepository,
  Pagination,
  new ComplaintsWorkFlow()
);

const fileUploadService = new FileUploadService(FieldValidator, fs, path, mime);
export { userService, complaintsService, fileUploadService };
