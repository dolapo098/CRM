import express from "express"; // A node js web framework used for building API's (npm registry)
import { httpRequestCallBack } from "../httpCallBack/index.mjs";
import { userController, uploadController } from "../controller/index.mjs";
import { Tokenization, roles, MulterUpload } from "../_helper/index.mjs";

export const router = express.Router();

// The authentication route which binds the user controller
router.post(
  "/authenticate",
  httpRequestCallBack(userController.authenticaton.bind(userController))
); // public route

//The get users route which binds the midleware for token/role verification and user controller
router.get(
  "/users",
  Tokenization.authToken(roles.client_engagement_officer),
  httpRequestCallBack(userController.getAllUsers.bind(userController))
); // client enagement officer only

//The get user which binds the middleware for token/role verification and user controller
router.get(
  "/user",
  Tokenization.authToken(roles.client_engagement_officer),
  httpRequestCallBack(userController.getUser.bind(userController))
); // client enagement officer only

router.post(
  "/fileUpload",
  Tokenization.authToken(roles.client_engagement_officer),
  MulterUpload.fileConfiguration().single("file"),
  httpRequestCallBack(uploadController.fileUpload.bind(uploadController))
);
