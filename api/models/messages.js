const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: [
        {
            email: { type: String, required: true },
            message: { type: String, required: true },
            date: { type: Date, defoult: Date.now }
        }
    ],
    user: {
        ref: 'Users',
        type: Schema.Types.ObjectId
    }
});


module.exports = mongoose.model('Message', messageSchema);
