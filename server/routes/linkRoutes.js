const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Links = require('../schema/linkSchema');
const secretKey = process.env.JWT_SECRET_KEY;

router.get('/getAll', async (req, res) => {
    try{

    }catch (error) {

    }
})

router.put('/addLink', async (req, res) => {
    const {title, url} = req.body;

    const token = req.headers.authorization.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secretKey);
    }catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    const userId = decodedToken.userId

    try {
        let userLinks = await Links.findOne({ userId });

        if(userLinks){
            userLinks.links.push({ title, url });
            await userLinks.save();
        } else {
            userLinks = new Links({
                userId,
                links: [{ title, url }]
            })
            await userLinks.save()
        }

        res.status(201).json(userLinks)
    } catch (error) {
        console.error('Error adding new link:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router