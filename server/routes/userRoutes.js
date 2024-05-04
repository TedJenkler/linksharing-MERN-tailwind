const express = require('express');
const router = express.Router();
const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

router.get('/', (req, res) => {
    res.send('Test')
})

module.exports = router;