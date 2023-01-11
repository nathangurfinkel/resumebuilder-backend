// login and register are functions in authController
//

const express = require('express');
const authController = require('../controllers/auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid password.' });
    }
    const token = jwt.sign({ _id: user._id }, 'secret');
    const userId = user._id;
    const expiresIn = 86400;
    res.send({ token, userId, expiresIn });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred while logging in.' });
  }
};

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.email);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'Email already in use.' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(201).send({ auth: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred while registering.' });
  }
};
