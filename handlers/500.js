const errorHandler = (error, request, response, next) => {
  response.status(500).send({
    code: 500,
    route: request.path,
    message: `Server error: ${error}`,
  });
};

module.exports = errorHandler;
