const logger = (request, response, next) => {
  console.log(`Logged at ${new Date()}`);
  console.log(`Method: ${request.method}`);
  next();
};

module.exports = logger;
