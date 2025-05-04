const Writing = require('../models/writing');
const { updateTotalWritings } = require('../controllers/statsController');
const axios = require('axios');
const mongoose = require('mongoose');

// Function to handle errors
const setError = (errorMessage) => {
    console.error(errorMessage);
    // Implement your error handling logic here, such as displaying the error message to the user interface
};

// Function to set category name (assuming it's defined elsewhere)
const setCategoryName = (name) => {
    // Implement logic to set category name
};

// Function to set writings (assuming it's defined elsewhere)
const setWritings = (writings) => {
    // Implement logic to set writings
};

// Get all writings
const getAllWritings = async (req, res) => {
    try {
        const writings = await Writing.find();
        res.json(writings.length > 0 ? writings : { message: 'No writings found' });
    } catch (error) {
        console.error('Error fetching writings:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single writing by ID
const getWritingById = async (req, res) => {
    try {
        const writing = await Writing.findById(req.params.id);
        if (!writing) {
            return res.status(404).json({ error: 'Writing not found' });
        }
        res.json(writing);
    } catch (error) {
        console.error('Error fetching writing by ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a writing
const updateWriting = async (req, res) => {
    const { title, description, content, author, categoryId, tags, status } = req.body;
    let imagePath = req.file ? req.file.path : null;

    try {
        const updatedWriting = await Writing.findByIdAndUpdate(req.params.id, {
            title,
            description,
            content,
            image: imagePath,
            author,
            categoryId,
            tags: Array.isArray(tags) ? tags : tags.split(','),
            status
        }, { new: true, runValidators: true });

        if (!updatedWriting) {
            return res.status(404).json({ error: 'Writing not found' });
        }
        await updateTotalWritings();
        res.json(updatedWriting);
    } catch (error) {
        console.error('Error updating writing:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Create a new writing
const createWriting = async (req, res) => {
    const { title, description, content, author, categoryId, tags, status } = req.body;
    let imagePath = req.file ? req.file.path : null;

    if (!title || !description || !content || !author) {
        return res.status(400).json({ message: "Missing required fields: title, description, content, and author are required." });
    }

    try {
        const newWriting = new Writing({
            title,
            description,
            content,
            categoryId,
            tags,
            status,
            author,
            image: imagePath
        });

        await newWriting.save();
        await updateTotalWritings();
        res.status(201).json(newWriting);
    } catch (err) {
        console.error('Save error:', err);
        res.status(500).json({ error: 'Failed to save writing', details: err.message });
    }
};

// Get all writings by a specific author
const getWritingsByAuthor = async (req, res) => {
    try {
        const writings = await Writing.find({ author: req.params.authorId });
        res.json(writings.length > 0 ? writings : { message: 'No writings found for this author' });
    } catch (error) {
        console.error('Error fetching writings by author:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all writings by a specific category
// In writingController.js
const getWritingsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID." });
    }

    try {
        const writings = await Writing.find({ categoryId: categoryId }).populate('author', 'name');
        if (writings.length > 0) {
            res.json(writings);
        } else {
            res.status(404).json({ message: 'No writings found for this category' });
        }
    } catch (error) {
        console.error('Error fetching writings by category:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




// Function to fetch author name
const fetchAuthorName = async (authorId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/authors/${authorId}`);
      return response.data.name;
    } catch (error) {
      console.error('Error fetching author name:', error);
      return 'Unknown Author';
    }
};


const incrementReadCount = async (req, res) => {
    const { id } = req.params; // Assuming 'id' is the writing's ID passed in the URL

    try {
        const writing = await Writing.findById(id);
        if (!writing) {
            return res.status(404).json({ message: 'Writing not found' });
        }

        writing.readCount = (writing.readCount || 0) + 1; // Increment the read count
        await writing.save();

        res.status(200).json({ message: 'Read count incremented successfully', readCount: writing.readCount });
    } catch (error) {
        console.error('Error incrementing read count:', error);
        res.status(500).json({ error: 'Failed to increment read count', details: error.message });
    }
};


const deleteWriting = async (req, res) => {
    try {
        const writing = await Writing.findByIdAndDelete(req.params.id);

        if (!writing) {
            return res.status(404).json({ message: 'Writing not found' });
        }

        res.status(200).json({ message: 'Writing deleted successfully' });
    } catch (error) {
        console.error('Error deleting writing:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

module.exports = {
    getAllWritings,
    getWritingById,
    updateWriting,
    createWriting,
    getWritingsByAuthor,
    fetchAuthorName,
    getWritingsByCategory,
    incrementReadCount,
    deleteWriting
};
