const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
mongoose.set('useFindAndModify', false);


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
    User.find({ fullName: {"$regex": req.headers.searchstring, "$options": "i"} }, 'fullName _id username friends',
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
            { $addToSet: { 
                      friends: req.body.newfriend
                   } 
            },
            {new: true},
            (err, user) => {
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
                  friends: req.body.friendTOBeDeleted
               } 
        }, (err, user) => {
            if(err){
                return res.status(404).json({ status: false, message: 'User record not found' });
            }else{
                User.findOneAndUpdate(
                { username: req.body.friendTOBeDeleted }, 
                { $pull: { 
                          friends: req.body.username
                       } 
                }, (err2, user2) => {
                    if(err2){
                        return res.status(404).json({ status: false, message: 'User record not found' });
                    }else{
                        return res.status(200).json({ status: true, message: 'Successfully deleted friends' });;
                    }
                }
                );
            }  
        }
    );
}

// delete a friend from a speficic user 
// request body: {"username":"...", "friendTOBeDeleted":" ..."}

module.exports.clearFriends = (req,res,next) => {
    User.findOneAndUpdate(
        { username: req.body.username }, 
        { $set: {
            friends: []
        }
        }, (err, user) => {
            return res.json(true);
          }
    );
}

//Get current friends and friend requests (to and from)
module.exports.getFriends = (req,res, next) => {
    collection = {current : [], incoming : [], sent : []};

    User.find({username: req.headers.username}, "friends", function (err, user) {
        if(!err) {
            User.find({username: user[0].friends, friends: req.headers.username}, "username", function (err2, user2) {
                //Total = current + sent
                if(!err2){
                    for(current of user2){
                        collection.current.push(current.username);
                    }
                    for(sent of user[0].friends){
                        if(!collection.current.includes(sent)){
                            collection.sent.push(sent);
                        }
                    }
                    User.find({friends: req.headers.username}, "username", function (err3, user3) {
                        if(!err3){
                            for(incoming of user3){
                                if(!user[0].friends.includes(incoming.username)){
                                    collection.incoming.push(incoming.username);
                                }
                            }

                            req.headers.collection = collection;
                            next();
                        }else{return res.status(500).json({ status: false, message: 'unexpected error' })};  
                    });
                }else{return res.status(500).json({ status: false, message: 'unexpected error' })};
            });
        }else{return res.status(500).json({ status: false, message: 'unexpected error' })};
    });
}

//Expects a list of usernames and returns the details associated with those usernames
module.exports.test = (req,res) => {
    collection = {current : [], incoming : [], sent : []};

    User.find({username: req.headers.collection.current}, 'fullName username',
        (err, users) => {
            if(!err){
                collection.current = users;
                User.find({username: req.headers.collection.incoming}, 'fullName username',
                    (err2, users2) => {
                        if(!err2){
                            collection.incoming = users2;
                            User.find({username: req.headers.collection.sent}, 'fullName username',
                                (err3, users3) => {
                                    if(!err3){
                                        collection.sent = users3;
                                        return res.json({lite: req.headers.collection, collection: collection});
                                    }else{return res.status(500).json({ status: false, message: 'unexpected error' })};
                                }
                            );
                        }else{return res.status(500).json({ status: false, message: 'unexpected error' })};
                    }
                );
            }else{return res.status(500).json({ status: false, message: 'unexpected error' })};
        }
    );
}