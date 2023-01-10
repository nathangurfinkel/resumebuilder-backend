const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  skills: [{
    type: String
  }],
  activities: [{
    type: String
  }],
  awards: [{
    type: String
  }],
  experience: [{
    company: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
  }],
  education: [{
    school: {
      type: String
    },
    degree: {
      type: String
    },
    field: {
      type: String
    }
  }],
  phone: {
    type: String
  }
});

module.exports = mongoose.model('Resume', resumeSchema);
