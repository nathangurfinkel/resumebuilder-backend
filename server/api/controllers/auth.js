const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred while logging in.' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'Email already in use.' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(201).send({ auth: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred while registering.' });
  }
};
