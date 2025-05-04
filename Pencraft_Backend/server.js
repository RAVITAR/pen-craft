require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const writingRoutes = require('./routes/writingRoutes');
const authorRoutes = require('./routes/authorRoutes');
const statsRoutes = require('./routes/statsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { addDefaultCategories } = require('./controllers/categoryController');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Serve static files from the 'public' directory

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/penCraft';
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {

    console.log('Connected to MongoDB');
    addDefaultCategories();
});

app.use('/api/writings', writingRoutes);
app.use('/api/author', authorRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/notification', notificationRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Serve Profile Picture Options
app.get('/api/profile-pictures', (req, res) => {
    const profilePictures = [
        { id: 1, url: '/images/profile1.png' },
        { id: 2, url: '/images/profile2.png' },
        { id: 3, url: '/images/profile3.png' }
    ];
    res.status(200).json(profilePictures);
});


const storiesData = [
    // ... your array of stories
];


app.get('/api/featured-stories', async (req, res) => {
    try {
      let stories = await Story.find(); // Fetch stories from the database
      stories = shuffleArray(stories); // Shuffle the stories array
      res.json(stories); // Send back the shuffled array
    } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error: error });
    }
});


// Endpoint to set a profile picture
app.post('/api/author/profile-picture', async (req, res) => {
    const { authorId, pictureId } = req.body;
    try {
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        const picture = await ProfilePicture.findById(pictureId);
        if (!picture) {
            return res.status(404).json({ message: 'Profile picture not found' });
        }
        author.profilePicture = picture._id;
        await author.save();
        res.status(200).json({ message: 'Profile picture updated successfully!', profilePictureId: picture._id });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile picture', error: error.message });
    }
});


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}


// Example POST route for handling JSON data
app.post('/api/example', (req, res) => {
    console.log('Received JSON:', req.body);
    res.status(200).json({ message: 'Data received', data: req.body });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
