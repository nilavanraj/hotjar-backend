const admin = require("firebase-admin");

const authenticate = (req, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error('Firebase token verification error:', error);
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
    });
};

  module.exports = {
    authenticate,
  };