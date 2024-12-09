const express = require('express');
const { Admin } = require('../models');
const bcrypt = require('bcryptjs');

router = express.Router();

//Create new admin
router.post('/', async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const newAdmin = await Admin.create({ username, email, password: hashedPassword });
		res.status(201).json(newAdmin);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
});

	// Get an admins
router.get('/:adminId', async (req, res) => {
		try {
			const adminId = req.params.adminId;
			const admin = await Admin.findByPk(adminId);
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: err.message });
		}
	});

	// Update an admin
router.put('/:adminId', async (req, res) => {
		try {
			const adminId = req.params.adminId;
			const admin = await Admin.findByPk(adminId);
			if (!admin) return res.status(500).json({ error: "Admin not found" });
			const { adminName, email, adminPassword } = req.body;

			if (adminName !== undefined) admin.adminName = adminName;
			if (email !== undefined) admin.email = email;
			if (adminPassword !== undefined) admin.adminPassword = adminPassword;

			admin.save();
			return res.status(200).json(admin);
			
		} catch (err) {
			return status(500).json({ error: err.message });
		}
	});

	// Delete an admin
router.delete('/:adminId', async (req, res) => {
		try {
			const { adminId } = req.params;
			const admin = await admin.findByPk(adminId);
			if (!admin) return res.status(500).json({ error: "Admin not found" });

			admin.destroy();
			return res.status(200).json({ message: "Admin deleted successfully" });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	});

	//Admin login
router.post('/login', async (req, res) => {
	console.log(req.body);
    const { email, password } = req.body;
    try {
            // Find admin by email
            const admin = await Admin.findOne({ where: { email } });
			console.log(admin);
            if (!admin) return res.status(400).json({ error: 'Admin not found' });

            // Compare passwds
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });

            // Return admin status for successful login
            res.status(200).json({ username: admin.username });
    } catch (error) {
            console.error('Login error', error);
            res.status(500).json({ error: 'Internal server error' });
    }
});


	module.exports = router;