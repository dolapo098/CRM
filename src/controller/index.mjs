import { UserController } from "./User.mjs";
import { UploadController } from "./upload.mjs";
import { ComplaintsController } from "./complaints.mjs";
import {
  userService,
  complaintsService,
  fileUploadService,
} from "../service/index.mjs";
import { logger, ResponseType } from "../_helper/index.mjs";

const userController = new UserController(userService, logger, ResponseType); //instantiate required dependencies for the Usercontroller
const uploadController = new UploadController(
  fileUploadService,
  logger,
  ResponseType
);
const complaintsController = new ComplaintsController(
  complaintsService,
  logger,
  ResponseType
);
export { userController, uploadController, complaintsController };
