const mongoose = require('mongoose');

const profilePictureSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        unique: true // Ensure filenames are unique
    },
    path: {
        type: String,
        required: true
    }
});

const ProfilePicture = mongoose.model('ProfilePicture', profilePictureSchema);
module.exports = ProfilePicture;
