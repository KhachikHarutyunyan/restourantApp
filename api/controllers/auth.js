const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');
const errHandler = require('../utils/errHandler');

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, { expiresIn: 60 * 300 });

      res.status(200).json({ token: `Bearer ${token}`, user: candidate });
    } else {
      res.status(401).json({ message: 'Passwords not mutch, try again' });
    }

  } else {
    res.status(404).json({ message: 'User not found' });
  }

}


module.exports.register = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({ message: 'Еmail is busy, try another' });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json({ user });
    } catch (err) {
      errHandler(res, err);
    }
    
  }
}
