const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Post = mongoose.model('posts');

const ctrlUser = require('../controllers/user.controller');
const ctrlPost = require('../controllers/post.controller');

const jwtHelper = require('../config/jwtHelper');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/queryUsers', ctrlUser.queryUsers);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);

router.post('/post', ctrlPost.savePost);


router.get('/test', (req, res) => {
    res.send('api works');
});

router.get('/posts', ctrlPost.getPost );
router.post('/editPost', ctrlPost.editPost);
router.post('/deletePost', ctrlPost.deletePost );


router.post('/addFriend', ctrlUser.addFriend);
router.post('/deleteFriend', ctrlUser.deleteFriend);
router.post('/getFriends', ctrlUser.getFriends);
router.post('/wipeFriends', ctrlUser.wipeFriends);








module.exports = router;