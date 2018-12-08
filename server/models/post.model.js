const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    fullName: String,
    text: String,
    //date: Date
});
mongoose.model('posts', postSchema);