const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Online Election System API',
			version: '1.0.0',
			description: 'API documentation for the election system',
		},
		servers: [{ url: 'http://localhost:5000' }],
	},
	apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
