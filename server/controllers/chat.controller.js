const Chat = mongoose.model('Chat');

/* GET ALL CHATS */
module.exports.getRoom = (req, res, next) => {
    Chat.find({ room: req.params.room }, function (err, chats) {
      if (err) return next(err);
      res.json(chats);
    });
  }
  
  /* SAVE CHAT */
  module.exports.saveChat = (req, res, next) => {
    Chat.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  }