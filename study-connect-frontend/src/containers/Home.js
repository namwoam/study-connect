import { React, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material';

import { UserCard } from '../components/UserCard';
import InformationModal from '../components/InformationModal';
import { fetchUserInfo } from '../utils/fetchUser';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const recommends = [
    {uid: 1, username: 'user1', selfIntro: 'Hi, my name is ...'},
    {uid: 2, username: 'user2', selfIntro: 'Hi, my name is ...'},
    {uid: 3, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {uid: 4, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {uid: 5, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {uid: 6, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {uid: 7, username: 'user3', selfIntro: 'Hi, my name is ...'}
]

const HomePage = () => {
    const userID = localStorage.getItem('userID')
    const [openModel, setOpenModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");

    const handleOpen = (uid) => {
        let selectedUser = fetchUserInfo(uid);
        let user = {
            student_id: "B101039992",
            self_introduction: 'Hi, my name is.......',
            department: '資管系',
            ig_account: "B101039992__",
            fb_account: "王小明"
        }
        setSelectedUser(user);
        setOpenModel(true);
    }

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Discover Your Friends Now
            </Typography>
            <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mt: '20px' }}>
            {recommends.map((recommend, index) => (
                <UserCard user={recommend} handleOpen={handleOpen} key={index} id={index}/>
            ))}
            </Box>
            <InformationModal open={openModel} setOpen={setOpenModel} user={selectedUser}/>
        </Container>
        
    );
}

export default HomePage;