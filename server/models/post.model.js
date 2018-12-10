const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    username: String,
    fullName: String,
    text: String,
    date: Number
});
mongoose.model('posts', postSchema);