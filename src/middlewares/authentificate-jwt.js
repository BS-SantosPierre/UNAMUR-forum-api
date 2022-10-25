/**
 * Middleware d'authentification via les JSON Web Token
 * @param {{adminRight: boolean}} options
 * @returns {(req: Request, res: Response, next: NextFunction) => Void}
 */
const authentificateJwt = (options = { adminRight: false }) => {

	/**
		* Middleware pour gérer les jwt
		* @param {Request} req
		* @param {Response} res
		* @param {NextFunction} next
		*/
	return async (req, res, next) => {
		return res.sendStatus(501)
	};
};

module.exports = authentificateJwt;
