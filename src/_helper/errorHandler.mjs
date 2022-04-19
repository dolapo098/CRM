import {
  UniqueConstraintError,
  MissingParamtersError,
  MissingResourceError,
  ValidationError,
  InternalServerError,
  UnauthorizedError,
  ForbiddenError,
} from "./errorClass.mjs";
import { ResponseType } from "./index.mjs";

//The module is provided to all contollers for application errors to be updated on the view
export const errorHandler = (error, logger) => {
  if (error instanceof UniqueConstraintError) {
    logger.error(error.message);
    return ResponseType.badRequest(error);
  } else if (error instanceof MissingParamtersError) {
    logger.error(error.message);
    return ResponseType.badRequest(error);
  } else if (error instanceof ForbiddenError) {
    logger.error(error.message);
    return ResponseType.badRequest(error);
  } else if (error instanceof MissingResourceError) {
    logger.error("error", error.message);
    return ResponseType.badRequest(error);
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

//The module is provided to all contollers for application errors to be updated on the view
export const errorLogger = (error, logger) => {
  if (error instanceof UniqueConstraintError) {
    logger.error(error.message);
  } else if (error instanceof MissingParamtersError) {
    logger.error(error.message);
  } else if (error instanceof ForbiddenError) {
    logger.error(error.message);
  } else if (error instanceof MissingResourceError) {
    logger.error("error", error.message);
  } else if (error instanceof ValidationError) {
    logger.error(error.message);
  } else if (error instanceof InternalServerError) {
    logger.error(error.message);
  } else if (error instanceof Error) {
    logger.error(error);
  }
};
