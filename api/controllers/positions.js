const Positions = require('../models/positions');
const errorHandler = require('../utils/errHandler');


module.exports.getByCategoryId = async function(req, res) {

  try {
    const positions = await Positions.find({
      category: req.params.categoryId,
      // user: req.user.id
    });

    res.status(200).json(positions);
  } catch (error) {
    errorHandler(res, error);
  }

};

module.exports.create = async function(req, res) {
  try {
    const position = await new Positions({
      name: req.body.name,
      body: req.body.body,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id
    }).save();
    res.status(201).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports.remove = async function(req, res) {
  try {
    await Positions.remove({ _id: req.params.id });
    res.status(200).json({ message: 'Position was deleted' });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.update = async function(req, res) {
  try {
    const position = await Positions.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    );
    res.status(200).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
};
