import express from "express";
const app = express();
import { logger } from "./_helper/index.mjs";
import { router } from "./route/index.mjs";

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/crm/api", router);
const port = process.env.NODE_ENV === "production" ? 80 : 4000;

app.listen(port, () => {
  logger.info(`server is now listening on port ${port}`);
});
