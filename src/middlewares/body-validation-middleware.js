const { Request, Response, NextFunction } = require('express');
const { BaseSchema } = require('yup');

/**
 * Middleware de validation Yup
 * @param {BaseSchema} yupValidator
 * @param {number} errorCode
 * @returns {(req: Request, res: Response, next: NextFunction) => Void}
 */
const bodyValidation = (yupValidator, errorCode = 422) => {
	/**
	 * Middleware pour valider les donnée du body via un validator Yup
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 */
	return async (req, res, next) => {
		try {
			const data = await yupValidator.validate(req.body, { abortEarly: false });

			req.validData = data;

			next();
		} catch (yupError) {
			const errors = yupError.inner.reduce((acc, error) => {
				const { path, message } = error;

				if (!acc.hasOwnProperty(path)) {
					// Si la propriété n'existe pas, initialiser le tableau
					acc[path] = [message];
				} else {
					// Si elle existe on ajoute un message d'erreur
					acc[path].push(message);
				}

				return acc;
			}, {});
			return res.status(errorCode).json(errors);
		}
	};
};

module.exports = bodyValidation;
