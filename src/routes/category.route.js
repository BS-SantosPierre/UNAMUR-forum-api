const categoryController = require('../controllers/category.controller');
const authentificateJwt = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { categoryValidator } = require('../validators/category.validator');

const categoryRouter = require('express').Router();

categoryRouter.route('/')
	.get(authentificateJwt(), categoryController.getAll)
	.post(authentificateJwt({ adminRight: true }), bodyValidation(categoryValidator), categoryController.add)

categoryRouter.route('/:id([0-9]+)')
	.get(categoryController.getById)
	.put(bodyValidation(categoryValidator), categoryController.update)
	.delete(categoryController.delete)

module.exports = categoryRouter;
