const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const db = require('../models');

const jwt = require('jsonwebtoken');

const authController = {
	register: async (req, res) => {
		// Récupération des données
		const { pseudo, email, isAdmin } = req.validData;

		// Hashage du mot de passe à l'aide de bcrypt
		const password = await bcrypt.hash(req.validData.password, 10);

		// Création du compte dans la db
		await db.Member.create({ pseudo, email, password, isAdmin });

		return res.sendStatus(201);
	},

	login: async (req, res) => {
		// Récupération de données login
		const { identifier, password } = req.validData;

		// Récupération du compte member
		const member = await db.Member.findOne({
			where: { // Condition avec OU
				[Op.or]: [
					{
						pseudo: identifier
					},
					{
						email: identifier
					}
				]
			}
		});

		if (!member) {
			return res.status(422).json({ message: 'Bad credentials' });
		}

		const isValid = await bcrypt.compare(password, member.password);

		if (!isValid) {
			return res.status(422).json({ message: 'Bad credentials' });
		}

		// Génération du token
		const dataToken = { id: member.id, pseudo: member.pseudo, isAdmin: member.isAdmin };
		const secret = process.env.JWT_SECRET;
		const options = {
			expiresIn: '12h'
		}

		jwt.sign(dataToken, secret, options, (err, token) => {
			if (err) {
				return res.sendStatus(400);
			}

			return res.status(200).json({ token });
		});
	},
};

module.exports = authController;
