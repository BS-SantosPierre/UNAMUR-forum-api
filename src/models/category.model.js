const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {

	const Category = sequelize.define('category', {
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: {
				name: 'UK_Categories__Name'
			}
		}
	}, {
		timestamps: false
	})

	return Category;
}
