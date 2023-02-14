const validator = (request, response, next) => {
  const title = request.query.title;
  if (!title) {
    next("Title is required");
  } else {
    next();
  }
};
module.exports = validator;
