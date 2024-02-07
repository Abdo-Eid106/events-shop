const Message = require(`${__dirname}/../models/messageModel.js`);

exports.addMessage = async (req, res, next) => {
   await Message.create(req.body);
   res.redirect("/contact");
};
