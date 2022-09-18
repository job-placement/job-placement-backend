// prevent logged in user to visit /login and /signup page
exports.fowardLoggedInUser = (request, response, next) => {
  if (!request.isAuthenticated()) return next();
  return response.status(301).send('You are already logged in');
}

exports.checkIfLoggedIn = (request, response, next) => {
  if (request.isAuthenticated()) return next();
  return response.status(401).send('Please log in to proceed');
}

exports.checkIfAdmin = (request, response, next) => {
  if (request.user.admin) return next();
  return response.status(401).send('Only Admins are allowed');
}

exports.checkIfUserProfile = (request, response, next) => {
  return next();
  return response.send('Working on it');
}

exports.checkIfUserCreatedJob = (request, response, next) => {
  return next();
  return response.send('Working on it');
}
