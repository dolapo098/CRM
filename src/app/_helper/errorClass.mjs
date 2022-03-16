//specified custom errors for the application

export class UniqueConstraintError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "UniqueConstraintError";
    this.message = message || "property value already exist";
    this.statusCode = statusCode;
  }
}

export class MissingResourceError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "MissingResourceError";
    this.message = message || "No results found";
    this.statusCode = statusCode;
  }
}

export class ValidationError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "ValidationError";
    this.message = message || "validation failed";
    this.statusCode = statusCode;
  }
}

export class MissingParamtersError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "MissingParamtersError";
    this.message = message || "Missing field parameter";
    this.statusCode = 400 || statusCode;
  }
}

export class InternalServerError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.message =
      message ||
      "Your request has caused our server to behave in a way we do not understand";
    this.name = "InternalServerError";
    this.statusCode = 500 || statusCode;
  }
}

export class UnauthorizedError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.message = message || "Invalid credentials provided";
    this.name = "UnauthorizedError";
    this.statusCode = 401 || statusCode;
  }
}

export class ForbiddenError extends Error {
  constructor(message, statusCode = 403) {
    super(message);
    this.message = message || "Access denied";
    this.name = "ForbiddenError";
    this.statusCode = 403 || statusCode;
  }
}

export class NotFoundError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.message = message || "The reqquest  could not be found";
    this.name = "NotFoundError";
    this.statusCode = 404 || statusCode;
  }
}
