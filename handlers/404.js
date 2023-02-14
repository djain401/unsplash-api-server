const notFoundHandler = (request, response) => {
  response.status(404).send("Not found");
};

module.exports = notFoundHandler;
