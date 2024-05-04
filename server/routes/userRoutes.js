const express = require('express');
const router = express.Router();
const User = require('../schema/userSchema');

router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const newUser = new User({
            firstname,
            lastname,
            email,
            password
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