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
	return (req, res, next) => {
		return res.sendStatus(501)
	};
};

module.exports = bodyValidation;
