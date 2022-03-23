import { UserController } from "./User.mjs";
import { UploadController } from "./upload.mjs";
import { userService } from "../service/index.mjs";
import { logger, ResponseType } from "../_helper/index.mjs";

const userController = new UserController(userService, logger, ResponseType); //instantiate required dependencies for the Usercontroller
const uploadController = new UploadController(
  userService,
  logger,
  ResponseType
);
export { userController, uploadController };
