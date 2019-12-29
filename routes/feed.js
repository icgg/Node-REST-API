const express = require('express');
const feedController = require('../controllers/feed');
const isAuth = require('../middelware/is-auth');
const router = express.Router();
const { check, body } = require('express-validator');

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/posts
router.post('/post', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
]
, isAuth, feedController.createPost);

// GET /feed/post/:postId
router.get('/post/:postId', isAuth, feedController.getPost)

// PUT /feed/post/:postId
router.put('/post/:postId', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], feedController.updatePost)

// DELETE /feed/post/:postId
router.delete('/post/:postId', isAuth, feedController.deletePost)

module.exports = router;