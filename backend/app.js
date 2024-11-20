require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const routes = require('./routes/VoterRoutes');
const app = express();
const setupSwagger = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');
const cors = require('cors');
setupSwagger(app);
app.use(errorHandler);
app.use(morgan('dev'));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api/voters', routes);

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
