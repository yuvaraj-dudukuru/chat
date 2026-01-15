const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('./auth');

router.get('/', (req, res) => {
  res.send({ response: 'Server is up and running.' }).status(200);
});

router.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  const result = await register(name, email, password);
  if (result.error) {
    return res.status(400).json(result);
  }
  res.json(result);
});

router.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const result = await login(email, password);
  if (result.error) {
    return res.status(401).json(result);
  }
  res.json(result);
});

router.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  res.json({ user: { id: decoded.sub, name: decoded.name, email: decoded.email } });
});

module.exports = router;