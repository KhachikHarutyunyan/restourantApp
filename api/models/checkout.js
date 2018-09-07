const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
    date: { type: Date, default: Date.now },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    telephon: { type: String, required: true },
    order: { type: Number, required: true },
    street: { type: String, required: true },
    payment: { type: String, required: true },
    orders: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            cost: { type: Number, required: true }
        }
    ]
});


module.exports = mongoose.model('Checkout', checkoutSchema);
