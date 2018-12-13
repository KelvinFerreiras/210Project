const mongoose = require('mongoose');

const Post = mongoose.model('posts');

module.exports.savePost = (req,res,next) => {
    var post = new Post();
    post.username = req.body.username;
    post.fullName = req.body.fullName;
    post.text = req.body.text;
    post.date = req.body.date;
   
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

    Post.find().sort('-date').find(function (err, posts) {
        if(!err) {
            res.send(posts)
        }
        else{
            return next(err);
        }
    });

    // Post.find({}, function(err, posts) {
    //     if(!err) {
    //         res.send(posts)
    //     }
    //     else{
    //         return next(err);
    //     }
    
    //   });
}




module.exports.editPost = (req,res,next) => {

    Post.findOneAndUpdate(
        { _id: req.body.id }, 
        { $set: { 
                  text: req.body.newText
               } 
        }, function (err, user) {

            return res.json(true);
          }
        
        );

}

module.exports.deletePost = (req,res,next) => {

    Post.remove({ _id: req.body.id }, function(err) {
        if (!err) {
                res.status(200);
        }
        else {
              res.status(500);
        }
    });


}
