const mongoose = require('mongoose');

const writingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    comments: [{
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: {
        type: String,
        enum: ['draft', 'published', 'private'],
        default: 'draft'
    },
    readCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Writing', writingSchema);
