const ProfilePicture = require('./models/ProfilePicture');

async function addProfilePicture(filename) {
    const path = `/profile_pics/${filename}`;
    const profilePic = new ProfilePicture({ filename, path });
    await profilePic.save();
    console.log('Profile picture added:', profilePic);
}

// Example usage
addProfilePicture('picture1.jpg');
addProfilePicture('picture2.jpg');
