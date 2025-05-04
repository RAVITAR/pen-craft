const Notification = require('../models/Notification');

const createNotification = async (req, res) => {
    const { recipient, origin, originType, type, message } = req.body;
    try {
        const newNotification = new Notification({
            recipient,
            origin,
            originType,
            type,
            message
        });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Failed to create notification', error: error.message });
    }
};

const getNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
    }
};

module.exports = { createNotification, getNotifications };
