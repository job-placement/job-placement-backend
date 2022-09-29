// prevent logged in user to visit /login and /signup page
exports.fowardLoggedInUser = (request, response, next) => {
  if (!request.isAuthenticated()) return next();
  return response.status(301).send("You are already logged in");
};

exports.checkIfLoggedIn = (request, response, next) => {
  if (request.isAuthenticated()) return next();
  return response.status(401).send("Please log in to proceed");
};
