const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats');
const Writing = require('../models/writing');
const mongoose = require('mongoose'); // Make sure to require mongoose

// Update total writings count
const updateTotalWritings = async () => {
    try {
        const totalWritings = await Writing.countDocuments();
        await Stats.updateMany({}, { $set: { totalWritings } });
    } catch (error) {
        console.error('Error updating total writings count:', error);
    }
};

// Update statistics for an author
router.patch('/stats/:authorId', async (req, res) => {
    const { authorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return res.status(400).json({ message: "Invalid authorId provided." });
    }

    const { totalReads, totalLikes, totalWritings } = req.body;
    try {
        const updatedStats = await Stats.findOneAndUpdate(
            { authorId },
            { $inc: { totalReads, totalLikes, totalWritings } },
            { new: true }
        );
        if (!updatedStats) {
            return res.status(404).json({ message: "No statistics found for this author." });
        }
        res.json(updatedStats);
    } catch (error) {
        console.error('Failed to update statistics:', error);
        res.status(500).json({ message: "Failed to update statistics", error: error.toString() });
    }
});

// Retrieve statistics by authorId
const getStatsByAuthorId = async (req, res) => {
    const { authorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return res.status(400).json({ message: "Invalid authorId provided." });
    }

    try {
        const stats = await Stats.findOne({ authorId });
        if (!stats) {
            return res.status(404).json({ message: 'Statistics not found for this author.' });
        }
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve statistics', error: error.message });
    }
};

module.exports = {
    getStatsByAuthorId, router, updateTotalWritings
};
