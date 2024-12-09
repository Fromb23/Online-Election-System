const express = require('express');
const { Candidate } = require('../models');

router = express.Router();

//Create new admin
router.post('/', async (req, res) => {
	try {
		const { adminName, adminEmail, adminPassword } = req.body;
		const newAdmin = await Admin.create({ adminName, adminEmail, adminPassword });
		res.status(201).json(newAdmin);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

	// Get an admins
	router.get('/:adminId', async (req, res) => {
		try {
			const adminId = req.params.adminId;
			const admin = await Admin.findByPk(adminId);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	});

	// Update an admin
	routes.put('/:adminId', async (req, res) => {
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
	routes.delete('/:adminId', async (req, res) => {
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