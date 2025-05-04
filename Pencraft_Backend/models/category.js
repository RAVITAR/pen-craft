const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        default: '' // Default value could be a placeholder image path
    }
});

module.exports = mongoose.model('Category', categorySchema);
