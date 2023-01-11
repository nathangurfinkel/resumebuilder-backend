const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/users');

usersRouter.get('/', usersController.list);
usersRouter.get('/:id', usersController.show);
usersRouter.post('/', usersController.create);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

module.exports = usersRouter;
