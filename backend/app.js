require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const routes = require('/routes');
const app = express();
const setupSwagger = require('./config/swagger');
setupSwagger(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.get('/api', routes);

// start server
app.listen(PORT, async () => {
	console.log(`Server running on http://localhost:${PORT}`);
	try {
		await sequelize.authenticate();
		console.log('Database connected successfully');
	} catch (err) {
		console.error('Unable to connect to the database: ', err);
	}
});
