    const express = require('express');
    const router = express.Router();
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const dotenv = require('dotenv');
    dotenv.config();
    const User = require('../schema/userSchema');
    const saltRounds = 10;
    const secretKey = process.env.JWT_SECRET_KEY;

    router.get('/getUserByToken', async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({ error: "Token missing" });
            }

            const decodedToken = jwt.verify(token, secretKey);
            const userId = decodedToken.userId;

            const user = await User.findById(userId)

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json(user);
        }catch (error) {
            console.error("Error finding user", error)
            res.status(500).json({ message: "Internal server error" })
        }
    })

    router.get('/getUserByEmail', async (req, res) => {

    })

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

    router.put("/profile/update", async (req, res) => {
        try {
            // Extract the token from the request header
            const token = req.headers.authorization.split(" ")[1];

            // Verify and decode the token to get the user information
            const decodedToken = jwt.verify(token, secretKey);
            const userId = decodedToken.userId;

            // Find the user by ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Update user details
            const { firstname, lastname, email } = req.body;
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;

            const updatedUser = await user.save();

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user profile:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    router.delete("/profile/delete", async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];

            const decodedToken = jwt.verify(token, secretKey);
            const userId = decodedToken.userId;

            const deletedUser = await User.findByIdAndDelete(userId);

            if(!deletedUser){
               return res.status(404).json({ error: "User not found" })
            }
            res.status(200).json({ message: "User deleted successfully" })
        }catch (error) {
            console.error("Error deleting user", error)
            res.status(500).json({ message: "Internal server error" })
        }
    })

    module.exports = router;