export function httpRequestCallBack(controller) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip,
      path: req.path,
      method: req.method,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse) {
        res.set(httpResponse.headers);
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      }
    } catch (err) {
      res.status(err.statusCode).send(err.data);
    }
  };
}
