import { React, useState, useEffect } from 'react';
import { Box, Typography, Snackbar, Container } from '@mui/material';

import { UserCard } from '../components/UserCard';
import InformationModal from '../components/InformationModal';
import { fetchUserInfo } from '../utils/fetchUser';
import instance from '../instance';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

// const recommends = [
//     {uid: 1, username: 'user1', selfIntro: 'Hi, my name is ...'},
//     {uid: 2, username: 'user2', selfIntro: 'Hi, my name is ...'},
//     {uid: 3, username: 'user3', selfIntro: 'Hi, my name is ...'},
//     {uid: 4, username: 'user3', selfIntro: 'Hi, my name is ...'},
//     {uid: 5, username: 'user3', selfIntro: 'Hi, my name is ...'},
//     {uid: 6, username: 'user3', selfIntro: 'Hi, my name is ...'},
//     {uid: 7, username: 'user3', selfIntro: 'Hi, my name is ...'}
// ]

const HomePage = () => {
    const userID = localStorage.getItem('userID')
    const [openModel, setOpenModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [recommends, setRecommends] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleOpen = (user) => {
        setSelectedUser(user);
        setOpenModel(true);
    }

    const fetchUserRecommends = async () => {
        try {
            const response = await instance.get(`/user/friend/recommend/${userID}`);
            if (response.data.success) {
                let recommends = [];
                let recommendIDs = response.data.data.recommendations;

                const fetchRecommendInfo = async (recommendID) => {
                    const friendInfo = await fetchUserInfo(recommendID);
                    const courseResponse = await instance.get(`/user/enrolled_courses/${recommendID}`);
                    if (courseResponse.data.success) {
                        if (friendInfo){
                            return { uid: recommendID, 
                                username: friendInfo.student_name, 
                                department: friendInfo.department_name, 
                                selfIntro: friendInfo.self_introduction ?? "",
                                courseRecords: courseResponse.data.data.courses
                            };
                        }
                        else {
                            return null;
                        }
                    }
                };
    
                const recommendInfoArray = await Promise.all(recommendIDs.map(fetchRecommendInfo));
                // Filter out undefined items
                recommends = recommendInfoArray.filter(info => info !== null);
                setRecommends(recommends);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchUserRecommends()
    }, [userID]);

    const sendFriendRequest = async (targetID) => {
        try {
            const response = await instance.post('/user/friend/send_request', {
                user: userID,
                target: targetID,
            });
            if (response.data.success) {
                setAlertMessage('Request sent successfully');
                setOpenSnackbar(true);
            } else {
                setAlertMessage('Failed to send request');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Discover Your Friends Now
            </Typography>
            <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mt: '20px' }}>
            {recommends.length > 0 && recommends.map((recommend, index) => (
                <UserCard user={recommend} handleOpen={handleOpen} key={index} id={index} sendFriendRequest={sendFriendRequest}/>
            ))}
            </Box>
            {selectedUser && <InformationModal open={openModel} setOpen={setOpenModel} user={selectedUser}/>}
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={openSnackbar}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={handleCloseSnackbar}
                message={alertMessage}
            />
        </Container>
        
    );
}

export default HomePage;