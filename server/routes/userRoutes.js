    const express = require('express');
    const router = express.Router();
    const jwt = require('jsonwebtoken');
    const User = require('../schema/userSchema');
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const secretKey = process.env.JWT_SECRET_KEY;

    router.post('/register', async (req, res) => {
        const { firstname, lastname, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                firstname,
                lastname,
                email,
                password: hashedPassword
            });

            const savedUser = await newUser.save();

            res.status(201).json(savedUser);

        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Error creating user' });
        }
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });

            if(!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if(passwordMatch) {
                const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
                res.status(200).json({ message: 'Login successful', token });
            } else {
                return res.status(401).json({ error: 'Invalid password' });
            }

        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    // implement authentication instead of email later with token
    router.put("/profile/update", async (req, res) => {
        try {
            const { oldEmail, firstname, lastname, newEmail } = req.body;

            const user = await User.findOne({ email: oldEmail });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.firstname = firstname;
            user.lastname = lastname;
            user.email = newEmail;

            const updatedUser = await user.save();

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user profile:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    })

    module.exports = router;