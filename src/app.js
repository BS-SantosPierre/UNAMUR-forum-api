const express = require('express');
const cors = require('cors');

// Permet d'avoir une propagation des erreurs avec les async/await dans express
require('express-async-errors');

// Load env file
require('dotenv-flow').config();

// Get env variable
const { APP_URL, APP_PORT, NODE_ENV } = process.env;

// Create Web API
const app = express();

// Add Middlewares
app.use(express.json());
app.use(cors());

// Initialize Database
const db = require('./models');
db.sequelize.authenticate()
	.then(() => console.log('Connection DB - OK'))
	.catch((error) => console.log('Connection DB - Error', error));

// Sync between models and database (Required DDL right)
if (NODE_ENV !== 'production') {
	// db.sequelize.sync();
}

// Add Routing
const router = require('./routes');
app.use('/api', router);

// Start Web API
app.listen(APP_PORT, () => {
	console.log(`Web API up on port ${APP_URL}:${APP_PORT}  [${NODE_ENV}]`);
});
