const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Links = require('../schema/linkSchema');
const secretKey = process.env.JWT_SECRET_KEY;

router.get('/getAll', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

        const userLinks = await Links.findOne({ userId });

        if (!userLinks) {
            return res.status(404).json({ message: 'No links found for this user' });
        } else {
            res.status(200).json(userLinks);
        }
    } catch (error) {
        console.error('Error fetching user links:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/addLink', async (req, res) => {
    const { links } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

        let userLinks = await Links.findOneAndUpdate(
            { userId },
            { links },
            { upsert: true, new: true }
        );

        res.status(200).json(userLinks);
    } catch (error) {
        console.error('Error updating links:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;