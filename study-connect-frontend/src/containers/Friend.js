import { React, useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material';
import instance from '../instance';
import { fetchUserInfo } from '../utils/fetchUser';
import FriendCard from '../components/FriendCard';
import FriendModal from '../components/FriendModal';
import InformationModal from '../components/InformationModal';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

const invites = [
    {uid: 1, username: 'user1', selfIntro: 'Hi, my name is ...', status: 'Unconfirmed'},
    {uid: 2, username: 'user2', selfIntro: 'Hi, my name is ...', status: 'Unconfirmed'},
    {uid: 3, username: 'user3', selfIntro: 'Hi, my name is ...', status: 'Unconfirmed'},
    {uid: 4, username: 'user3', selfIntro: 'Hi, my name is ...', status: 'Unconfirmed'},
    {uid: 5, username: 'user3', selfIntro: 'Hi, my name is ...', status: 'Unconfirmed'},
    {uid: 6, username: 'user3', selfIntro: 'Hi, my name is ...', status: 'Unconfirmed'},
    {uid: 7, username: 'user3', selfIntro: 'Hi, my name is ...', status: 'Unconfirmed'}
]

const FriendPage = () => {
    const userID = localStorage.getItem('userID')
    const [openModel, setOpenModel] = useState(false);
    //const [invatations, setInvatations] = useState(invites);
    const [userFriends, setUserFriends] = useState([]);
    const [alerts, setAlerts] = useState(false);

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

    const handleOpen = () => {
        //setInvatations();
        console.log(invites);
        setOpenModel(true);
    };

    const accept_friend = (studentID) => {
        console.log("accept: ", studentID);
    }

    const reject_friend = (studentID) => {
        console.log("reject: ", studentID);
    }

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Your Friends
            </Typography>
            <Button size='small'
                maxHeight='10px'
                variant="contained"
                color='primary'
                sx={{width: '100px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600, position: 'absolute', top: '12%', right: '23%'}}
                onClick={handleOpen}
            >
                View Invitations
            </Button>
            <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mt: '20px' }}>
            {friends.map((friend, index) => (   
                <FriendCard friend={friend}/>
            ))}
            </Box>
            <FriendModal open={openModel} setOpen={setOpenModel} invatations={friends} accept_friend={accept_friend} reject_friend={reject_friend} />
        </Container>
        
    );
}

export default FriendPage;