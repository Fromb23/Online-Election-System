const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
	const token = req.header('Authorization');
	if (!token) res.status(401).json({ error: 'Access denied' });

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).json({ error: 'Invalid token' });
	}
});

module.exports = authenticate;
