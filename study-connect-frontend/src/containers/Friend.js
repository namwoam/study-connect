import { React, useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material';
import instance from '../instance';

import InformationModal from '../components/InformationModal';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const FriendCard = {
    padding: '15px', 
    width: '800px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

const friends = [
    {uid: 1, username: 'user1', selfIntro: 'Hi, my name is ...', ig_account: 'user1_ig', fb_account: 'user1_fb'},
    {uid: 2, username: 'user2', selfIntro: 'Hi, my name is ...', ig_account: 'user2_ig', fb_account: 'user2_fb'},
    {uid: 3, username: 'user3', selfIntro: 'Hi, my name is ...', ig_account: 'user3_ig', fb_account: 'user3_fb'},
    {uid: 4, username: 'user3', selfIntro: 'Hi, my name is ...', ig_account: 'user4_ig', fb_account: 'user4_fb'},
    {uid: 5, username: 'user3', selfIntro: 'Hi, my name is ...', ig_account: 'user5_ig', fb_account: 'user5_fb'},
    {uid: 6, username: 'user3', selfIntro: 'Hi, my name is ...', ig_account: 'user6_ig', fb_account: 'user6_fb'},
    {uid: 7, username: 'user3', selfIntro: 'Hi, my name is ...', ig_account: 'user7_ig', fb_account: 'user7_fb'}
]



const FriendPage = () => {
    const userID = localStorage.getItem('userID')
    const [openModel, setOpenModel] = useState(false);
    const [detailUserId, setDetailUserId] = useState("");
    const [userFriends, setUserFriends] = useState([]);

    // WIP
    const fetchUserInfo = async (friendId) => {
        try {
            const response = await instance.get(`info/user/info/${friendId}`);
            if (response.data.success) {
                return response.data.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // WIP
    const fetcUserFriends = async () => {
        try {
            const response = await instance.get(`/user/friend/list/${userID}`);
            if (response.data.success) {
                let friends = [];
                let friendIDs = response.data.data.friends;
                console.log(friendIDs);
                friendIDs.forEach((friendID) => {
                    const friendInfo = fetchUserInfo(friendID);
                    friends.push({uid: friendID})
                })
                setUserFriends([...friends]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetcUserFriends()
    }, [userID]);

    const handleOpen = (userId) => {
        setDetailUserId(userId);
        setOpenModel(true);
    };

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Your Friends
            </Typography>
            <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mt: '20px' }}>
            {friends.map((friend, index) => (
                <Paper elevation={3} sx={FriendCard}>
                    <Typography variant="h5" gutterBottom>
                        {friend.username}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        {friend.selfIntro}
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={2}>
                            <Box bgcolor='#ff8000' borderRadius="10px" textAlign="center" marginTop="1px">
                                <Typography variant="subtitle1" color="#ffffff">
                                    IG Account
                                </Typography>
                            </Box>
                            <Box bgcolor='#ff8000' borderRadius="10px" textAlign="center" marginTop="1px">
                                <Typography variant="subtitle1" color="#ffffff">
                                    FB Account
                                </Typography>
                            </Box>
                        </Grid>                        
                        <Grid item xs={8} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant="body1" textAlign="center">{friend.ig_account}</Typography>
                            <Typography variant="body1" textAlign="center">{friend.fb_account}</Typography>
                        </Grid>
                    </Grid>
                    
                </Paper>
            ))}
            </Box>
            <InformationModal open={openModel} setOpen={setOpenModel} userId={detailUserId}/>
        </Container>
        
    );
}

export default FriendPage;