import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button, IconButton,  Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const Header = () => {

  const handleSignOut = () => {
    // Implement your sign-out logic here
    console.log('Signing out...');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                {/* Logo */}
                <Typography variant="h6" color='#DE5000'>
                    StudyConnect
                </Typography>

                {/* Router Links */}
                <IconButton size="small" color="inherit" component={Link} to="/" >
                    Home
                </IconButton>
                <IconButton size="small" color="inherit" component={Link} to="/friendlist" >
                    Friend
                </IconButton>
                <IconButton size="small" color="inherit" component={Link} to="/group" >
                    Group
                </IconButton>

                {/* Avatar and Sign Out */}
                <Avatar size="small" sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
                <IconButton edge="end" size="small" color="primary" onClick={handleSignOut}>
                    Sign Out
                </IconButton>
            </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
