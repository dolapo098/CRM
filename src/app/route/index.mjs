import express from "express"; // A node js web framework used for building API's (npm registry)
import { httpRequestCallBack } from "../httpCallBack/index.mjs";
import { userController } from "../controller/index.mjs";
import { Tokenization, roles } from "../_helper/index.mjs";

export const router = express.Router();

router.post(
  "/authenticate",
  httpRequestCallBack(userController.authenticaton.bind(userController))
); // public route

router.get(
  "/users",
  Tokenization.authToken(roles.client),
  httpRequestCallBack(userController.getAllUsers.bind(userController))
); // client enagement officer only

router.get(
  "/user",
  Tokenization.authToken(roles.client),
  httpRequestCallBack(userController.getUser.bind(userController))
); // client enagement officer only
