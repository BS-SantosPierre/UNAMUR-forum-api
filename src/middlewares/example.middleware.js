const { Request, Response, NextFunction } = require('express');

const exampleMiddleware = (params) => {
	/**
	 * Middleware pour valider les donnée du body via un validator Yup
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 */
	return (req, res, next) => {
		next()
	};
};
