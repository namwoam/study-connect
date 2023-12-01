import { React, useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Divider,  Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const pages = ['Home', 'Friend', 'Group']
const Header = () => {
    const storedPage = localStorage.getItem('currentPage');
    const initialPage = storedPage ? parseInt(storedPage, 10) : 0;
    const [currentPage, setCurrentPage] = useState(initialPage);
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    const handleSignOut = () => {
        // Implement your sign-out logic here
        console.log('Signing out...');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* logo */}
                    <Typography variant="h6" fontWeight={800} color='#DE5000'>
                        StudyConnect
                    </Typography>

                    {/* page button */}
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Box sx={{ margin: 3}}>
                            <Divider orientation="vertical" color="gray" />
                        </Box>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                // color="inherit"
                                sx={{ my: 2, display: 'block', color: currentPage === index ? 'black' : 'gray' }}
                                onClick={() => setCurrentPage(index)}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* avatar and sign out */}
                    <Avatar size="small" sx={{ margin:1, bgcolor: deepOrange[500] }}>A</Avatar>
                    <Button edge="end" size="small" color="primary" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;