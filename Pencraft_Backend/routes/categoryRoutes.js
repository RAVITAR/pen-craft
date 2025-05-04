// Require express and your category controller
const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Create a new category
router.post('/create', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get category by ID
router.get('/:id', categoryController.getCategoryById); // Add this route

// Update a category by ID
router.patch('/update/:id', categoryController.updateCategory);

// Delete a category by ID
router.delete('/delete/:id', categoryController.deleteCategory);

// Export the router
module.exports = router;
