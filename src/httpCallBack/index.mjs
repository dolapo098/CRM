//The middleware is used to access the request and response objects which any specific contoller used to update both views and models
export function httpRequestCallBack(controller) {
  return async (req, res, err) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip,
      path: req.path,
      method: req.method,
      files: req.file,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
      loggedinuser: req.user,
    };

    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse) {
        res.set(httpResponse.headers);
        res.type("json");

        //response sent to the client based on a success call
        res.status(httpResponse.statusCode).send(httpResponse.body);
      }
    } catch (err) {
      //response sent to the client based on an error type thrown in the application
      res.status(err.statusCode).send(err.data);
    }
  };
}

//The middleware is used to access the request and response object for file download
export function httpRequestContentDisposition(controller) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip,
      path: req.path,
      method: req.method,
      files: req.file,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };

    try {
      const httpResponse = await controller(httpRequest);

      console.log(httpResponse);
      if (httpResponse) {
        res.set(
          "Content-disposition",
          "attachment; filename=",
          httpResponse.fileName
        );
        res.set("Content-type", httpResponse.mimetype);
        res.status(httpResponse.statusCode).download(httpResponse.file);
      }
    } catch (err) {
      // console.log(err);
      //response sent to the client based on an error type thrown in the application
      res.status(err.statusCode).send(err.data);
    }
  };
}
