const express = require('express');
const router = express.Router();
const ProfilePicture = require('../models/ProfilePicture');

router.post('/add-profile-picture', async (req, res) => {
    const { filename, path } = req.body;
    try {
        const newPic = new ProfilePicture({ filename, path });
        await newPic.save();
        res.status(201).json({ message: "Profile picture added successfully", newPic });
    } catch (error) {
        res.status(500).json({ message: "Error adding profile picture", error: error.message });
    }
});

module.exports = router;
