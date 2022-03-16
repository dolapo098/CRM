import {
  UniqueConstraintError,
  MissingParamtersError,
  MissingResourceError,
  ValidationError,
  InternalServerError,
} from "./errorClass.mjs";
import { ResponseType } from "./index.mjs";

export const errorHandler = (error, logger) => {
  if (error instanceof UniqueConstraintError) {
    logger.error(error.message);
    return ResponseType.badRequest(error);
  } else if (error instanceof MissingParamtersError) {
    logger.error(error.message);
    return ResponseType.badRequest(error);
  } else if (error instanceof MissingResourceError) {
    logger.error("error", error.message);
    return ResponseType.notFound(error);
  } else if (error instanceof ValidationError) {
    logger.error(error.message);
    return ResponseType.badRequest(error);
  } else if (error instanceof InternalServerError) {
    logger.error(error.message);
    return ResponseType.internalServerError(error);
  } else if (error instanceof Error) {
    logger.error(error);
  }
};
