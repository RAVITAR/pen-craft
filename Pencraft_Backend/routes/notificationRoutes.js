// Require express and your notification controller
const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

// Create a new notification
router.post('/create', notificationController.createNotification);

// Get notifications for a user by their ID
router.get('/:userId', notificationController.getNotifications);

// Export the router
module.exports = router;
