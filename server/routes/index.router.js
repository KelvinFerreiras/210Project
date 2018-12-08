const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlPost = require('../controllers/post.controller');


router.post('/register', ctrlUser.register);

router.post('/post', ctrlPost.postTest);


router.get('/test', (req, res) => {
    res.send('api works');
});


module.exports = router;