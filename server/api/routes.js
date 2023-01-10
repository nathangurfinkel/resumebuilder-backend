const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const resumesRouter = require('./routes/resumes');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/resumes', resumesRouter);
};