import express from "express"; //https://expressjs.com/  An unopinionated framework for building web application in Node Js
const app = express();
import { logger } from "./_helper/index.mjs"; // the logging module  from winston logger
import { router } from "./route/index.mjs"; // the router module from express js which contains all the endpoints

app.use(express.json()); // A middlware from express js  used for parsing incoming request in json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/crm/api", router);
const port = process.env.NODE_ENV === "production" ? 80 : 4000;

//an express method used for listeing to any specific connection
app.listen(port, () => {
  logger.info(`server is now listening on port ${port}`);
});
