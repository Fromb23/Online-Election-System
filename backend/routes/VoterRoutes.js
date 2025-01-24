require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Voter } = require('../models');
const transporter = require('../utils/mailer');
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

		const mailOptions = {
			from: `"Election System" <${process.env.EMAIL_USER}>`,
			to: email,
		subject: 'REGISTRATION TO VOTE IN THE ELECTION',
			html: `
			  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
				<h2 style="color: #333; text-align: center;">Welcome, ${fullName}!</h2>
				<p style="font-size: 16px; line-height: 1.5; color: #555;">
				  You have been successfully registered as a voter in our system. Below are your login credentials:
				</p>
				<div style="padding: 15px; background-color: #f0f0f0; border-radius: 5px; margin: 20px 0; font-size: 16px;">
				  <p><strong>Voter ID:</strong> ${voterId}</p>
				  <p><strong>Password:</strong> ${randomPassword}</p>
				</div>
				<p style="font-size: 16px; line-height: 1.5; color: #555;">
				  Please log in to the system and <strong>change your password</strong> for security purposes.
				</p>
				<a 
				  href="http://localhost:3000/voter-login" 
				  style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px; text-align: center; margin-top: 20px;"
				>
				  Log In Now
				</a>
				<p style="font-size: 14px; color: #777; margin-top: 20px;">
				  If you have any questions or encounter any issues, feel free to contact us at 
				  <a href="mailto:support@your-election-system.com" style="color: #007bff;">support@your-election-system.com</a>.
				</p>
				<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
				<p style="font-size: 12px; color: #aaa; text-align: center;">
				  &copy; 2025 Election System. All Rights Reserved.
				</p>
			  </div>
			`,
		  };

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log('Error sending email:', error);
			} else {
				console.log('Email sent:', info.response);
			}
		})

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

router.get('/track/:token', async (req, res) => {
    const token = req.params.token; // Retrieve the token from the URL

    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const voter = await Voter.findByPk(decoded.voterId);

        if (!voter) {
            return res.status(404).json({ error: 'Voter not found' });
        }

        res.status(200).json({ voterId: voter.voterId, fullName: voter.fullName });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
});

module.exports = router;