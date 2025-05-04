const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Author = require('../models/Author');
const mongoose = require('mongoose');
const Stats = require('../models/Stats'); // Adjust the path as necessary

// Register a new author
const register = async (req, res) => {
    const { name, email, password, socialMedia = {}, bio = '', website = '', contactEmail = '', phoneNumber = '' } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Basic validation to check if essential fields are provided
    if (!name.trim() || !normalizedEmail || !password.trim()) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password.trim() === '') {
        return res.status(400).json({ message: 'Password cannot be empty.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Original password:', password); // Log original password
        console.log('Hashed password:', hashedPassword); // Log hashed password

        const newUser = new Author({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            bio,
            website,
            contactEmail,
            phoneNumber,
            socialMedia
        });

        const savedUser = await newUser.save();

        // Optionally create a statistics entry for the new author
        try {
            console.log('Creating statistics for user:', savedUser._id);
            const newStatistics = new Stats({
                authorId: savedUser._id,
                totalWritings: 0,
                totalReads: 0,
                totalLikes: 0
            });
            await newStatistics.save();
            console.log('Statistics created successfully');
        } catch (statsError) {
            console.error('Statistics creation error:', statsError);
        }

        res.status(201).json({ message: 'User registered successfully.', userId: savedUser._id });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Failed to register user.' });
    }
};

// Authenticate an author and issue a JWT
const login = async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    try {
        const user = await Author.findOne({ email: normalizedEmail });
        if (!user) {
            console.error(`User with email ${normalizedEmail} not found.`);
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log('Found user:', user);

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', passwordMatch); // Log the result of the comparison

        if (!passwordMatch) {
            console.error(`Invalid credentials for user ${normalizedEmail}.`);
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`Login successful for user ${normalizedEmail}. Token generated.`);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to login.' });
    }
};

// Fetch all authors
const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        console.error('Fetching authors error:', error);
        res.status(500).json({ message: 'Failed to fetch authors.' });
    }
};

// Fetch a single author by ID
const getAuthorById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid author ID.' });
    }

    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found.' });
        }
        res.status(200).json(author);
    } catch (error) {
        console.error('Fetch author by ID error:', error);
        res.status(500).json({ message: 'Failed to fetch author by ID.' });
    }
};

// Update an author's details
const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, profilePicture } = req.body;  // Include profilePicture if it's part of the update

    if (!email) {
        return res.status(400).json({ message: 'Email must be provided.' });
    }

    // Prepare the update data
    const updatedData = {
        name,
        email: email.toLowerCase(),  // Normalize the email to lower case
        ...(profilePicture && { profilePicture })  // Conditionally add profilePicture to update object
    };

    if (password) {
        try {
            updatedData.password = await bcrypt.hash(password, 10);
        } catch (error) {
            console.error('Error hashing password:', error);
            return res.status(500).json({ message: 'Failed to update password.' });
        }
    }

    try {
        const updatedAuthor = await Author.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Author not found.' });
        }
        res.status(200).json(updatedAuthor);
    } catch (error) {
        console.error('Error updating author:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Failed to update author.', details: error.message });
    }
};

// Delete an author
const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the author
        const deletedAuthor = await Author.findByIdAndDelete(id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Author not found.' });
        }

        // Delete the author's statistics entry
        await Stats.findOneAndDelete({ authorId: id });

        res.status(200).json({ message: 'Author deleted successfully.' });
    } catch (error) {
        console.error('Delete author error:', error);
        res.status(500).json({ message: 'Failed to delete author.' });
    }
};

const incrementTotalReads = async (req, res) => {
    const authorId = req.params.id;

    try {
        let stats = await Stats.findOne({ authorId });

        if (!stats) {
            return res.status(404).json({ message: 'Stats not found for this author.' });
        }

        stats.totalReads += 1;

        await stats.save();

        res.status(200).json({ message: 'Total reads incremented for author.', stats });
    } catch (error) {
        console.error('Error incrementing total reads for author:', error);
        res.status(500).json({ error: 'Failed to increment total reads for author.' });
    }
};

const incrementLikes = async (req, res) => {
    const authorId  = req.params.id;

    try {
        const stats = await Stats.findOneAndUpdate(
            { authorId: authorId },
            { $inc: { totalLikes: 1 } },
            { new: true, upsert: false } // change to `upsert: false` if you don't want new documents created
        );

        if (!stats) {
            return res.status(404).json({ message: 'Stats not found for this author.' });
        }

        res.status(200).json({ message: 'Total likes incremented for author.', stats });
    } catch (error) {
        console.error('Error incrementing total likes for author:', error);
        res.status(500).json({ error: 'Failed to increment total likes for author.' });
    }
};

module.exports = { register, login, getAuthors, getAuthorById, updateAuthor, incrementTotalReads, incrementLikes, deleteAuthor };
