const { Sequelize } = require('sequelize');

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_SERVER, DB_PORT } = process.env;

// Sequelize Initialization
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD,
	{
		host: DB_SERVER,
		port: DB_PORT,
		dialect: 'postgres',
		pool: {
			min: 0,
			max: 5,
			idle: 10_000,
			acquire: 30_000
		}
	}
);

// Create object DB
const db = {};

// Add instance of Sequelize
db.sequelize = sequelize;

// Add models
db.Category = require('./category.model')(sequelize);
db.Member = require('./member.model')(sequelize);

// Export object DB
module.exports = db;
