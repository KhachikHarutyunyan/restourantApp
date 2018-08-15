const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: { type: String },
  body: { type: String },
  imageSrc: { type: String },
  user: {
    ref: 'Users',
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Categories', categorySchema);

