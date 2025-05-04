console.log("Importing getAuthorById function...");
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
console.log("AuthorController module:", authorController);
const Stats = require('../models/Stats');

// Define routes for authors
router.get('/', authorController.getAuthors);

// Add the route for fetching an author by ID
router.get('/:id', authorController.getAuthorById);

router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

// Register a new author
router.post('/register', authorController.register);

// Login an author
router.post('/login', authorController.login);

router.post('/:id/increment-reads', authorController.incrementTotalReads);

router.post('/:id/increment-likes', authorController.incrementLikes);


module.exports = router;
