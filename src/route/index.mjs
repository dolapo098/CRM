import express from "express"; // A node js web framework used for building API's (npm registry)
import {
  httpRequestCallBack,
  httpRequestContentDisposition,
} from "../httpCallBack/index.mjs";
import {
  userController,
  uploadController,
  complaintsController,
} from "../controller/index.mjs";
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
  Tokenization.authToken(roles.client),
  httpRequestCallBack(userController.getAllUsers.bind(userController))
); // client enagement officer only

//The get user which binds the middleware for token/role verification and user controller
router.get(
  "/user",
  Tokenization.authToken(roles.client_engagement_officer),
  httpRequestCallBack(userController.getUser.bind(userController))
); // client enagement officer only

//The  file upload route which binds the middleware for token/role verification, Multer obj(req.file obj) and file controller
router.post(
  "/fileUpload",
  Tokenization.authToken(roles.client),
  MulterUpload.fileConfiguration().single("file"),
  httpRequestCallBack(uploadController.fileUpload.bind(uploadController))
);

router.get(
  "/download",
  Tokenization.authToken([
    roles.client,
    roles.client_engagement_officer,
    roles.food_processing_officer,
    roles.food_taster,
  ]),
  httpRequestContentDisposition(
    uploadController.download.bind(uploadController)
  )
);

//The  post complaints request which binds the middleware for token/role verification and compalints controller
router.post(
  "/complaints/initiate",
  Tokenization.authToken(roles.client),
  httpRequestCallBack(
    complaintsController.makeComplaints.bind(complaintsController)
  )
);

//The  post complaints  review request for client ngagement officer which binds the middleware for token/role verification and compalints controller
router.post(
  "/complaints/review/engagementofficer/:id",
  Tokenization.authToken(roles.client_engagement_officer),
  httpRequestCallBack(
    complaintsController.manageRequest.bind(complaintsController)
  )
);

//The  post complaints reviw request for food processing officer which binds the middleware for token/role verification and compalints controller
router.post(
  "/complaints/review/foodprocessingofficer/:id",
  Tokenization.authToken(roles.food_processing_officer),
  httpRequestCallBack(
    complaintsController.manageRequest.bind(complaintsController)
  )
);

//The  post complaints review by id request for food taster which binds the middleware for token/role verification and compalints controller
router.post(
  "/complaints/review/foodtaster/:id",
  Tokenization.authToken(roles.food_taster),
  httpRequestCallBack(
    complaintsController.manageRequest.bind(complaintsController)
  )
);

//The get all complaints request which binds the middleware for token/role verification and compalints controller
router.get(
  "/complaints",
  Tokenization.authToken(roles.client),
  httpRequestCallBack(
    complaintsController.complaintsByInitiator.bind(complaintsController)
  )
);

router.get(
  "/clientofficer/complaints",
  Tokenization.authToken(roles.client_engagement_officer),
  httpRequestCallBack(
    complaintsController.clientOfficerViewComplaints.bind(complaintsController)
  )
);

router.get(
  "/foodofficer/complaints",
  Tokenization.authToken(roles.food_processing_officer),
  httpRequestCallBack(
    complaintsController.foodOfficerViewComplaints.bind(complaintsController)
  )
);

router.get(
  "/foodtaster/complaints",
  Tokenization.authToken(roles.food_taster),
  httpRequestCallBack(
    complaintsController.foodTasterViewComplaints.bind(complaintsController)
  )
);

router.get(
  "/complete/complaints",
  Tokenization.authToken([
    roles.food_taster,
    roles.client_engagement_officer,
    roles.food_processing_officer,
  ]),
  httpRequestCallBack(
    complaintsController.getAllCompleteRequest.bind(complaintsController)
  )
);

//The get complaints  by id request which binds the middleware for token/role verification and compalints controller
router.get(
  "/complaint/:id",
  Tokenization.authToken([
    roles.client,
    roles.client_engagement_officer,
    roles.food_processing_officer,
    roles.food_taster,
  ]),
  httpRequestCallBack(
    complaintsController.getComplaintById.bind(complaintsController)
  )
);
