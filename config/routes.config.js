const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controller');

// Routes here
// Example:
router.get('/posts', posts.list);
router.post('/posts', posts.create);
router.get('/posts/:id', posts.detail);
router.patch('/posts/:id', posts.edit);
router.delete('/posts/:id', posts.delete);

module.exports = router;
