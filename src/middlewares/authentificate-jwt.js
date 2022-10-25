const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('../models');
/**
 * Middleware d'authentification via les JSON Web Token
 * @param {{ adminRight: boolean }} options
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
		const authHeader = req.headers['authorization'];

		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			return res.sendStatus(401);
		}

		// Décodage du token
		jwt.verify(token, process.env.JWT_SECRET, {}, async (error, tokenData) => {
			// Extraction des donnés du JWT
			if (error) {
				// En cas d'erreur
				return res.sendStatus(403);
			}

			// Verification des droits de l'utilisateur
			if (options.adminRight) {
				// Validation des drois via la db
				const admin = await db.Member.findOne({
					where: {
						[Op.and]: [
							{ id: tokenData.id },
							{ isAdmin: true }
						]
					}
				});

				if (!admin) {
					return res.sendStatus(403);
				}
			}
			// Ajout des infos du token à l'objet 'request'
			req.user = tokenData;

			//On continue :)
			next();
		})
	};
};

module.exports = authentificateJwt;
