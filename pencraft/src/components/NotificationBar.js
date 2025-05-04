import {
    Badge,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext'; // Ensure this path is correct for accessing authentication context

const NotificationBar = () => {
    const { user } = useAuth(); // Assuming user information includes userId
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (user) {
                try {
                    const response = await fetch(`/api/notifications/user/${user.userId}`);
                    const data = await response.json();
                    setNotifications(data);
                } catch (error) {
                    console.error('Failed to fetch notifications', error);
                }
            }
        };

        fetchNotifications();
    }, [user]);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton color="inherit" onClick={handleOpen}>
                <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
            >
                {notifications.map((notification) => (
                    <MenuItem key={notification._id} onClick={handleClose}>
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary={notification.message} />
                    </MenuItem>
                ))}
                {notifications.length === 0 && (
                    <MenuItem onClick={handleClose}>
                        <ListItemText primary="No notifications" />
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default NotificationBar;
