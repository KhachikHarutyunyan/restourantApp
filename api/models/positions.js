const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
  cost: { type: Number, required: true },
  category: {
    ref: 'Categories',
    type: Schema.Types.ObjectId
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
});


module.exports = mongoose.model('Positions', positionSchema);
