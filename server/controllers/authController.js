const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при регистрации пользователя', error });
  }
};

// Аутентификация пользователя
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Недействительные учетные данные' });
    }

    const token = jwt.sign({ id: user._id }, 'Ваш токен', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при входе в систему', error });
  }
};
