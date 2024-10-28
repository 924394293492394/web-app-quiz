const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Носитель ', '');
  if (!token) return res.status(401).json({ message: 'Доступ запрещен' });

  try {
    const decoded = jwt.verify(token, 'Ваш токен');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Неверный токен' });
  }
};

module.exports = authMiddleware;
