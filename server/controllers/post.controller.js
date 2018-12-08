const mongoose = require('mongoose');

const Post = mongoose.model('posts');

module.exports.savePost = (req,res,next) => {
    var post = new Post();
    post.username = req.body.username;
    post.fullName = req.body.fullName;
    post.text = req.body.text;
   // post.date = req.body.date;
   
    // post.username = "kelkft".
    // post.fullName = "Kelvin Ferreiras"
    // post.text = "Hello Worlds!";
    //post.date = Date.now();
    post.save((err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['This email address is already in use.']);
            else
                return next(err);
        }
    });
}

module.exports.getPost = (req,res) => {

    Post.find({}, function(err, posts) {
        if(!err) {
            res.send(posts)
        }
        else{
            return next(err);
        }
    
      });
}

