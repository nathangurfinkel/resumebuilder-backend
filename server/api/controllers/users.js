const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

exports.list = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'An error occurred while retrieving users.' });
  }
};

exports.show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'An error occurred while retrieving the user.' });
  }
};

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'An error occurred while creating the user.' });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'An error occurred while updating the user.' });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'An error occurred while deleting the user.' });
  }
};

exports.isValidPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    res.status(200).send({ isValid });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'An error occurred while validating the password.' });
  }
};
