const Category = require('../models/categories');
const Positions = require('../models/positions');
const User = require('../models/user');
const errorHandler = require('../utils/errHandler');

module.exports.getAll = async function(req, res) {

  if (req.user.admin) {
    try {
      const categories = await Category.find({ user: req.user.id });
      res.status(200).json(categories);
    } catch (error) {
      errorHandler(res, error);
    }
  } else {
    res.json({ message: 'Only Admin can do this operation!' });
  }
  
}

module.exports.getById = async function(req, res) {

  if (req.user.admin) {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      errorHandler(res, error);
    }
  } else {
    res.json({ message: 'Only Admin can do this operation!' });
  }
  
}

module.exports.remove = async function(req, res) {
  
  if (req.user.admin) {
    try {
      await Category.remove({ _id: req.params.id });
      await Positions.remove({ category: req.params.id });
      res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
      errorHandler(res, error);
    }
  } else {
    res.json({ message: 'Only Admin can do this operation!' });
  }
  
}

module.exports.create = async function(req, res) {

  if (req.user.admin) {
    const category = new Category({
      title: req.body.title,
      body: req.body.body,
      imageSrc: req.file.path,
      user: req.user.id
    });
  
    try {
      await category.save();
      res.status(201).json(category);// 201 status saved
    } catch (error) {
      errorHandler(res, error);
    }
  } else {
    res.json({ message: 'Only Admin can do this operation!' });
  }

  
}


module.exports.update = async function(req, res) {
  
  if (req.user.admin) {
    const update = {
      title: req.body.title,
      body: req.body.body
    };
  
    if (req.file) {
      update.imageSrc = req.file.path;
    } else {
      res.json({ message: 'Choos Image!' });
    }
  
    try {
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id},
        { $set: update },
        { new: true }
      );
      res.status(200).json(category);
    } catch (error) {
      errorHandler(res, error);
    }
  } else {
    res.json({ message: 'Only Admin can do this operation!' });
  }
  
};
