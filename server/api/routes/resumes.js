const express = require('express');
const resumesRouter = express.Router();
const resumesController = require('../controllers/resumes');
console.log('resumesController', resumesController);
// resumesController {
//     list: [AsyncFunction (anonymous)],
//     create: [AsyncFunction (anonymous)],
//     read: [AsyncFunction (anonymous)],
//     update: [AsyncFunction (anonymous)],
//     delete: [AsyncFunction (anonymous)]
//   }

resumesRouter.get('/', resumesController.list);
resumesRouter.post('/', resumesController.create);
resumesRouter.get('/:id', resumesController.read);
resumesRouter.put('/:id', resumesController.update);
resumesRouter.delete('/:id', resumesController.delete);

module.exports = resumesRouter;
