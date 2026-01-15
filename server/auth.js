const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const JWT_EXPIRES_IN = '7d';

// In-memory user store (replace with real DB in production)
const users = [];

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const generateToken = (user) => {
  return jwt.sign(
    { sub: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const register = async (name, email, password) => {
  const existing = users.find((u) => u.email === email.toLowerCase());
  if (existing) {
    return { error: 'User already exists' };
  }

  const hashedPassword = await hashPassword(password);
  const user = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  const token = generateToken(user);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
};

const login = async (email, password) => {
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user) {
    return { error: 'Invalid credentials' };
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return { error: 'Invalid credentials' };
  }

  const token = generateToken(user);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { register, login, verifyToken, users };
