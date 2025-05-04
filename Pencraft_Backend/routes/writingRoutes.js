const express = require('express');
const writingController = require('../controllers/writingController');

// Create the router object
const router = new express.Router();

// Fetch all writings
router.get('/', writingController.getAllWritings);

// Fetch a single writing by ID
router.get('/:id', writingController.getWritingById);

// Update a writing by ID
router.put('/:id', writingController.updateWriting);

// Create a new writing
router.post('/', writingController.createWriting);

// Fetch all writings by a specific author
router.get('/by-author/:authorId', writingController.getWritingsByAuthor);

// Fetch all writings by a specific category
router.get('/categories/:categoryId', writingController.getWritingsByCategory);

router.delete('/:id', writingController.deleteWriting);

router.post('/:id/increment-reads', writingController.incrementReadCount);

// Export the configured router
module.exports = router;
