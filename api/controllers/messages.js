const Messages = require('../models/messages');
const errorHandler = require('../utils/errHandler');


module.exports.saveMessage = async function(req, res) {
    
    const newMessage = new Messages({
        userId: req.body.userId,
        // message: [
        //     {
        //         email: req.body.email,
        //         message: req.body.message
        //     }
            
        // ],
        email: req.body.email,
        message: req.body.message
        
    });

    try {
        await newMessage.save();
    
        res.status(201).json({ message: 'Message saved' });
    } catch (error) {
        errorHandler(res, error);
    }

}

module.exports.getUserMessage = async function(req, res) {

    try {
        const userMessages = await Messages.find({ userId: req.params.id });

        console.log(userMessages[0].message);

        res.status(200).json(userMessages);
    } catch (error) {
        errorHandler(res, error);
    }

}

