const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controller');
const users = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');

// Posts
router.get('/posts', auth, posts.list);
router.post('/posts', auth, posts.create);
router.get('/posts/:id', auth, posts.detail);
router.patch('/posts/:id', auth, posts.edit);
router.delete('/posts/:id', auth, posts.delete);

// User
router.post('/users', users.create);
router.post('/login', users.login);
router.get('/profile', auth, users.profile);
router.get('/users/:id/validate', users.validate);

module.exports = router;
