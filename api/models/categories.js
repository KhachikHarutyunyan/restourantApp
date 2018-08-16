const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String },
  category: [
    {
      title: { type: String },
      imageSrc: { type: String },
      user: {
        ref: 'Users',
        type: Schema.Types.ObjectId
      }
    }
  ]
});

module.exports = mongoose.model('Categories', categorySchema);

