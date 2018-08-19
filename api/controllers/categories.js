const Category = require('../models/categories');
const Positions = require('../models/positions');
// const User = require('../models/user');
const errorHandler = require('../utils/errHandler');

module.exports.getAll = async function(req, res) {

  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    errorHandler(res, error);
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
      name: req.body.name,
      category: [
        {
          title: req.body.title,
          imageSrc: req.file.path,
          user: req.user.id
        }
      ]
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
    const categoryImg = await Category.findById(req.params.id);
    const update = {
      name: req.body.name,
      category: [
        {
          title: req.body.title,
          imageSrc: req.file? req.file.path: categoryImg.category[0].imageSrc,
          user: req.user.id
        }
      ]
    };

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
  
}
