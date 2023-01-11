const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userModel = require('./server/api/models/user');
const resumeModel = require('./server/api/models/resume');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
atlas_uri =
  'mongodb+srv://natangurfinkel:gsjcoxd888E0KsC1@natangurfinkel.1ctyttj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(atlas_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'natangurfinkel',
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

const usersRouter = require('./server/api/routes/users');
const resumesRouter = require('./server/api/routes/resumes');
const authRouter = require('./server/api/routes/auth');

app.use('/api/users', usersRouter);
app.use('/api/resumes', resumesRouter);
app.use('/api/auth', authRouter);
// list routes by  http://localhost:8080/
app.get('/', (req, res) => {
  res.json({
    users: 'http://localhost:8080/users',
    resumes: 'http://localhost:8080/resumes',
    auth: 'http://localhost:8080/auth',
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
