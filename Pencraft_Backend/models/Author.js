const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
        type: String,
        ref: 'ProfilePicture', // Assuming you have a ProfilePicture model
        default: null
    },
    socialMedia: {
        facebook: String,
        twitter: String,
        linkedIn: String,
        instagram: String
    },
    bio: String,
    website: String,
    contactEmail: String,
    phoneNumber: String
});

module.exports = mongoose.model('Author', authorSchema);
