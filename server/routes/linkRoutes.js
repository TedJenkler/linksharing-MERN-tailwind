const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Links = require('../schema/linkSchema');
const secretKey = process.env.JWT_SECRET_KEY;
const mongoose = require('mongoose');

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

    if (!Array.isArray(links)) {
        return res.status(400).json({ error: 'Invalid links array' });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    try {
        let userLinks = await Links.findOne({ userId });

        if (!userLinks) {
            userLinks = new Links({
                userId,
                links
            });
        } else {
            links.forEach(newLink => {
                const existingLink = userLinks.links.find(link => link.title === newLink.title);
                if (existingLink) {
                    existingLink.url = newLink.url;
                } else {
                    userLinks.links.push(newLink);
                }
            });
        }

        const savedList = await userLinks.save();
        res.status(201).json(savedList);
    } catch (error) {
        console.error('Error adding new link list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;