const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = new Router();

router.
  post('/auth/login', AuthController.login);

module.exports = router;