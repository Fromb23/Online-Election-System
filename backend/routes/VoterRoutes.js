require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Voter } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to generate a random 7-character password
const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 7; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
	console.log('Generated password: ', password);
    return password;
};

// Function to calculate age
const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    return m < 0 || (m === 0 && today.getDate() < dob.getDate()) ? age - 1 : age;
};

// POST route to create a voter
router.post('/', async (req, res) => {
    try {
        const { voterId, fullName, county, pollingStation, constituency, email, dateofbirth } = req.body;

        const age = calculateAge(dateofbirth);
        if (age < 18) {
            return res.status(400).json({ message: 'User not eligible to vote.' });
        }

        const randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newVoter = await Voter.create({
            voterId,
            fullName,
			county,
			pollingStation,
            constituency,
            email,
            password: hashedPassword,
            dateofbirth,
        });

        res.status(201).json({
            message: 'Voter created successfully.',
            voter: { voterId, fullName, email, password: randomPassword },
        });
    } catch (error) {
        console.error('Error creating voter:', error);
        res.status(500).json({ message: 'Error creating voter.' });
    }
});

// Get all voters
router.get('/', async (req, res) => {
	try {
		const voters = await Voter.findAll();
		res.status(200).json(voters);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get voter by id
router.get('/:voterId', async (req, res) => {
	try {
		const { voterId } = req.params;
		const voter = await Voter.findByPk(voterId);
		if (!voter) return res.status(401).json({ error: 'Voter not found' });
		res.status(200).json(voter);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});


// update a voter
router.put('/:voterId', async (req, res) => {
	try {
		const { voterId } = req.params;
		const { fullName, county, constituency, pollingStation, email, voted } = req.body;
		const voter = await Voter.findByPk(voterId);
		if (!voter) return res.status(401).json({ error: 'Voter not found' });

		voter.fullName = fullName || voter.fullName;
		voter.county = county || voter.county;
		voter.constituency = constituency || voter.constituency;
		voter.pollingStation = pollingStation || voter.pollingStation;
		voter.email = email || voter.email;
		voter.voted = voted || voter.voted;
		voter.save();

		res.status(200).json(voter)
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
});

// Delete voter
router.delete('/:voterId', async (req, res) => {
	try {
		const { voterId} = req.params;
		const voter = await Voter.findByPk(voterId);
		if (!voter) return res.status(401).json({ error: 'Voter not found!' });

		voter.destroy();
		res.status(200).json({ message: 'Voter deleted successfully...' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// POST route to login a voter
router.post('/login', async (req, res) => {
	const { voterId, password } = req.body;
	console.log('Voter ID: ', voterId);
  
	try {
	  // Check if voter exists
	  const voter = await Voter.findOne({ where: { voterId } });
	  if (!voter) {
		return res.status(400).json({ message: 'Voter not found' });
	  }
  
	  // Check if password matches
	  const isMatch = await bcrypt.compare(password, voter.password);
	  if (!isMatch) {
		return res.status(400).json({ message: 'Invalid credentials' });
	  }
  
	  // Check if it's the first login
	  if (voter.is_first_login) {
		return res.status(200).json({ 
		  message: 'First login, please change your password', 
		  is_first_login: true 
		});
	  }
  
	  // Generate JWT token
	  const token = jwt.sign(
		{ voterId: voter.voterId, role: voter.role },
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	  );
  
	  res.json({ token });  // Send back the token
	} catch (error) {
	  console.error('Login error:', error);
	  res.status(500).json({ message: 'Server error' });
	}
  }); 

  router.post('/update-password', async (req, res) => {
	console.log("Received request body:", req.body);
	const { voterId, newPassword } = req.body;
  
	try {
	  const voter = await Voter.findOne({ where: { voterId } });
	  if (!voter) return res.status(400).json({ error: 'Voter not found' });
  
	  const hashedPassword = await bcrypt.hash(newPassword, 10);
	  voter.password = hashedPassword;
	  voter.is_first_login = false;
  
	  await voter.save();
  
	  return res.status(200).json({ message: 'Password updated successfully, redirecting to dashboard' });
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({ error: 'Server error' });
	}
  });

module.exports = router;