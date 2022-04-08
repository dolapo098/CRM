export class ResponseType {
  //static method for Json responses used by the controller
  static responseIsJson(data) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: {
        code: "00",
        data: data,
      },
    };
  }

  //static response for http 400 error code bad requests used by the controller
  static badRequest(err) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: {
        code: "99",
        msg: err.message,
      },
    };
  }

  //static response for http 404 error code used by the controller
  static notFound(err) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 404,
      data: {
        code: "99",
        msg: err.message,
      },
    };
  }

  //static response for http 500 internal server error used by the contoller
  static internalServerError(err) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 500,
      data: {
        code: "99",
        msg: err.message,
      },
    };
  }

  static contentDisposition(fileName, mimeType, file) {
    return {
      fileName: fileName,
      mimeType: mimeType,
      statusCode: 200,
      file: file,
    };
  }
}
