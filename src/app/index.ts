const express = require("express");
const app = express();
import { logger } from "../app/shared/logging";
const port = 3000;

app.listen(port, () => {
  logger.info(`server is now listening on port ${port}`);
});
