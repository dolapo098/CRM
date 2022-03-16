export class ResponseType {
  //prepare response results to be sent to the client
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
}
