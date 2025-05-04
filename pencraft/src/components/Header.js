    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';
import NotificationBar from './NotificationBar';

import {
    AppBar,
    ClickAwayListener,
    Divider,
    IconButton,
    InputAdornment,
    ListItemIcon,
    Menu, MenuItem,
    TextField,
    Toolbar, Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../AuthContext'; // Adjust this path as necessary

const HeaderContainer = styled(AppBar)`
background: linear-gradient(45deg, #CF1020, #FF4500, #D81120, #CF1020);
background-size: 400% 400%;
z-index: 10;
`;

const StyledToolbar = styled(Toolbar)`
display: flex;
justify-content: space-between;
`;

const StyledLink = styled(Link)`
color: #fff;
text-decoration: none;
margin-right: 20px;

&:hover {
    color: #ddd;
}
`;

const SearchField = styled(TextField)`
.MuiInputBase-input {
    color: #fff;
}
`;



    
    const Header = () => {
        const { isAuthenticated, setIsAuthenticated } = useAuth();
        const navigate = useNavigate();
        const [anchorEl, setAnchorEl] = useState(null);

        const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const { logout } = useAuth(); // if logout is provided by useAuth

        const handleLogout = () => {
            logout(); // Use the logout function from AuthContext
            handleClose();
            navigate('/AuthorLogin');
        };




        return (
            <ClickAwayListener onClickAway={handleClose}>
                <HeaderContainer position="static">
                    <StyledToolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component={StyledLink} to="/">YourLogo</Typography>
                        <div>
                            <SearchField
                                variant="outlined"
                                size="small"
                                placeholder="Search..."
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon style={{ color: '#fff' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => { navigate('/AuthorDashboard'); handleClose(); }}>
                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                    Dashboard
                                </MenuItem>
                                <MenuItem onClick={() => { navigate('/AuthorProfile'); handleClose(); }}>
                                    <ListItemIcon><PersonIcon /></ListItemIcon>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={() => { navigate('/AuthorSettings'); handleClose(); }}>
                                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={() => { navigate('/AuthorList'); handleClose(); }}>
                                    <ListItemIcon><ListIcon /></ListItemIcon>
                                    Author List
                                </MenuItem>
                                <MenuItem onClick={() => { navigate('/WritingPortfolio'); handleClose(); }}>
                                    <ListItemIcon><WorkIcon /></ListItemIcon>
                                    Writing Portfolio
                                </MenuItem>
                                <MenuItem onClick={() => { navigate('/add-writing'); handleClose(); }}> {/* Link to the add new writings form */}
                                    <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                                    Add New Writings
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                        <NotificationBar />
                    </StyledToolbar>
                </HeaderContainer>
            </ClickAwayListener>
        );
    };

    export default Header;
