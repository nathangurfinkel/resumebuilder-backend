const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  summary: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  activities: [
    {
      type: String,
    },
  ],
  awards: [
    {
      type: String,
    },
  ],
  experience: [
    {
      company: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
      },
      degree: {
        type: String,
      },
      field: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  phone: {
    type: String,
  },

});

module.exports = mongoose.model('Resume', resumeSchema);
