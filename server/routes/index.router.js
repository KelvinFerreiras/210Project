const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Post = mongoose.model('posts');

const ctrlUser = require('../controllers/user.controller');
const ctrlPost = require('../controllers/post.controller');


router.post('/register', ctrlUser.register);

router.post('/post', ctrlPost.savePost);


router.get('/test', (req, res) => {
    res.send('api works');
});

router.get('/posts', ctrlPost.getPost );





module.exports = router;