import { React, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material';

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

const recommends = [
    {uid: 1, username: 'user1', selfIntro: 'Hi, my name is ...'},
    {uid: 2, username: 'user2', selfIntro: 'Hi, my name is ...'},
    {uid: 3, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {uid: 4, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {uid: 5, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {uid: 6, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {uid: 7, username: 'user3', selfIntro: 'Hi, my name is ...'}
]



const HomePage = ({userID}) => {
    const [openModel, setOpenModel] = useState(false);
    const [detailUserId, setDetailUserId] = useState("");
    const handleOpen = (userId) => {
        setDetailUserId(userId);
        setOpenModel(true);
    }

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Discover Your Friends Now
            </Typography>
            <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mt: '20px' }}>
            {recommends.map((recommend, index) => (
                <Grid container spacing={2} sx={FriendCard}>
                    <Grid md={8}>
                        <Typography>
                            {recommend.username}
                        </Typography>
                        <Typography>
                            {recommend.selfIntro}
                        </Typography>
                    </Grid>
                    <Grid md={4} 
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end' 
                        }}
                    >
                        <Button
                            size='small'
                            variant="contained"
                            color='primary'
                            sx={{width: '120px', mb: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                        >
                            Send Request
                        </Button>
                        <Button
                            size='small'
                            variant="contained"
                            color='secondary'
                            onClick={() => handleOpen(recommend.uid)}
                            sx={{width: '120px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                        >
                            Show More
                        </Button>
                    </Grid>
                </Grid>
            ))}
            </Box>
            <InformationModal open={openModel} setOpen={setOpenModel} userId={detailUserId}/>
        </Container>
        
    );
}

export default HomePage;