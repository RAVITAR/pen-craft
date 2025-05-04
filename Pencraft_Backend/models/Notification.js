const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    originType: {
        type: String,
        enum: ['Author', 'Writing'],
        required: true
    },
    type: {
        type: String,
        enum: ['comment', 'like', 'follow', 'mention', 'update'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
