const mongoose = require('mongoose');
const Resume = mongoose.model('Resume');
const ObjectId = mongoose.Types.ObjectId;

exports.list = async (req, res) => {
  const resumes = await Resume.find({});
  res.json(resumes);
};

exports.create = async (req, res) => {
  const resume = await new Resume(req.body).save();

  res.json(resume);
};

exports.read = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.json(resume);
};

exports.update = async (req, res) => {
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).exec();
  res.json(resume);
};

exports.delete = async (req, res) => {
  const resume = await Resume.findByIdAndRemove(req.params.id);
  res.json(resume);
};
