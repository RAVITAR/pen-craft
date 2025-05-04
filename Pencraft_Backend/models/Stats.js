const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', unique: true, required: true },
    totalWritings: Number,
    totalReads: Number,
    totalLikes: { type: Number, default: 0 },
    readTimeAvg: Number,
    engagementRate: Number,
    followerGrowth: [{
        month: String,
        count: Number
    }],
    comparativeAnalysis: {
        rank: Number,
        percentile: Number
    }
});

module.exports = mongoose.model('Stats', statisticsSchema);
