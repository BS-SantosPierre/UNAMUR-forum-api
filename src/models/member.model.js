const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {

	const Member = sequelize.define('member', {
		pseudo: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: {
				name: 'UK_Members__Pseudo'
			}
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: {
				name: 'UK_Members__Email'
			}
		},
		password: {
			type: DataTypes.CHAR(60),
			allowNull: false
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		createdAt: true,
		updatedAt: false
	});

	return Member;
}
