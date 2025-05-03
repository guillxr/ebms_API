const jwt = require('jsonwebtoken');
const config = require('@config');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) res.status(403).json({ error: 'missing token!' });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) res.status(403).json({ error: err.message });
    req.user = user;
    next();
  });
};

module.exports = { authenticateJWT };
