const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req,res,next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;

    // user.username = req.body.password;
    // user.birthday = req.body.password;
    user.username = 'userTest'+Date.now();
    user.birthday = Date.now();
    user.bio= 'loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum';

    


    user.bio = '';
    user.friends=[];
    user.created = Date.now();

    user.save((err, doc) => {
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

//calling passport.authenticate function to check for error, 
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        //if error from passport
        if (err) return res.status(400).json(err);
        //if success - registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        //if unknown ser or wrong pass
        else return res.status(404).json(info);
    })(req, res);
}

//user profiles method that holds user details 
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if(!user)
                return res.status(404).json({ status: false, message: 'User record not found' });
            else 
                return res.status(200).json({ status: true, user: _.pick(user,['fullName','email', 'birthday','username','bio']) });
        }
    );
}

//Queries all users whose name matches
module.exports.queryUsers = (req, res) => {
    User.find({ fullName: {"$regex": req.headers.searchstring, "$options": "i"} }, 'fullName _id',
        (err, users) => {
            if(!users)
                return res.status(404).json({ status: false, message: 'None exists' });
            else 
                return res.status(200).json({ status: true, users: users});
        }
    ).limit(parseInt(req.headers.limit));
}


// add a friend to a speficic user 
// request body: {"username":"...", "newfriend":" ..."}

module.exports.addFriend = (req,res,next) => {

        User.findOneAndUpdate(
            { username: req.body.username }, 
            { $push: { 
                      friends: {
                        "username" : req.body.newfriend
                        }  
                   } 
            }, function (err, user) {

                return res.json(true);
              }
            
            );

}
// delete a friend from a speficic user 
// request body: {"username":"...", "friendTOBeDeleted":" ..."}

module.exports.deleteFriend = (req,res,next) => {

    User.findOneAndUpdate(
        { username: req.body.username }, 
        { $pull: { 
                  friends: {
                    "username" : req.body.friendTOBeDeleted
                    }  
               } 
        }, function (err, user) {
            return res.json(true);
          }
        
        );

  
}

// return all friends from a speficic user 
// request body: {"username":"..."}

module.exports.getFriends = (req,res) => {

    User.find({username: req.body.username}, {friends: 1 }, function (err, user) {
        if(!err) {

            res.send(user);
        }
        else{
            return next(err);
        }
    });
}

module.exports.getFriends = (req,res) => {

    User.find({username: req.body.username}, {friends: 1 }, function (err, user) {
        if(!err) {

            res.send(user);
        }
        else{
            return next(err);
        }
    });
}



