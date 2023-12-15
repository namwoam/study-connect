import { React, useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Divider,  Avatar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { deepOrange } from '@mui/material/colors';
import { fetchUserInfo } from '../utils/fetchUser';

const pages = ['Home', 'Friend', 'Course', 'Group'];

const Header = ({ userID, currentPage, onPageChange, setIslogin, isAdmin}) => {
    const [username, setUsername] = useState("USERNAME");
    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const getUserInfo = await fetchUserInfo(userID);
                console.log("header user info:",getUserInfo);
                setUserInfo(getUserInfo);
                setUsername(getUserInfo.student_name);
            }
            catch (error) {
                console.error('Error fetching userinfo:', error);
            }            
        }
        fetchUser();
        
    }, [userID]);

    useEffect(() => {
        console.log("header:", currentPage);
    }, [currentPage]);

    const handleSignOut = () => {
        localStorage.clear();
        setIslogin(false);
        console.log('Signing out...');
    };

    const handlePageClick = (index) => {
        onPageChange(index);
        localStorage.setItem('currentPage', index.toString());
      };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={1} position="fixed">
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
                                onClick={() => handlePageClick(index)}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* avatar and sign out */}
                    <Button
                        sx={{ margin: 1}}
                        onClick={() => handlePageClick(4)}>
                        <Avatar size="small" sx={{ height:'24px', width: '24px', marginRight: 1, bgcolor: deepOrange[400] }} />
                        <Typography variant="subtitle2" color='black'>
                            {username ?? 'userA'}
                        </Typography>
                    </Button>
                    {isAdmin ?
                        <Button 
                            sx={{ margin: 1}}
                            color="primary" 
                            startIcon={<AdminPanelSettingsIcon/>} 
                            onClick={() => handlePageClick(5)}>
                                Admin
                        </Button> : <></>
                    }
                    <Button 
                        sx={{ margin: 1}}
                        edge="end" 
                        size="small" 
                        color="primary" 
                        endIcon={<ArrowForwardIcon/>} 
                        onClick={handleSignOut}>
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
