const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Регистрация пользователя
exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'Регистрация успешна' });
    } catch (error) {
      console.error("Ошибка в процессе регистрации:", error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };

// Авторизация пользователя
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Неверный email или пароль' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Неверный email или пароль' });
      }
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error("Ошибка в процессе авторизации:", error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
  