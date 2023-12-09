import { React, useState } from 'react';
import { Box, Grid, Typography, Button, Container, TextField, Autocomplete } from '@mui/material';

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

const COURSE_ENTRY = [
    {id: 1, label: '資料庫管理'},
    {id: 2, label: '網路技術與應用'},
    {id: 3, label: 'AAA'},
    {id: 4, label: 'd'},
    {id: 5, label: 'ff'},
    {id: 6, label: 'vv'},
    {id: 7, label: 'eee'},
]

const courses = [
    {courseId: 1, username: 'user1', selfIntro: 'Hi, my name is ...'},
    {courseId: 2, username: 'user2', selfIntro: 'Hi, my name is ...'},
    {courseId: 3, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {courseId: 4, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {courseId: 5, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {courseId: 6, username: 'user3', selfIntro: 'Hi, my name is ...'},
    {courseId: 7, username: 'user3', selfIntro: 'Hi, my name is ...'}
]


const CoursePage = () => {
    const userID = localStorage.getItem('userID')
    const [openModel, setOpenModel] = useState(false);
    const [detailUserId, setDetailUserId] = useState("");
    const handleOpen = (userId) => {
        setDetailUserId(userId);
        setOpenModel(true);
    }

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Discover Course Groups
            </Typography>
            <Autocomplete 
                size='small'
                sx={{ width: '400px', marginTop: '30px', marginBottom: '30px' }}
                options={COURSE_ENTRY}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => 
                    <TextField {...params} label="Check available groups in your course" />}
                // onChange={(event, newValue, reason) => {
                //     setValues({...values, courseId: reason === "clear" || reason === "removeOption" ? null : newValue.id});
                // }}
                // value={COURSE_ENTRY.find(v => v.id === Number(values.courseId)) || null}
            />
            <Box sx={{ maxHeight: '65vh', overflowY: 'auto'}}>
            {courses.map((course, index) => (
                <Grid container spacing={2} sx={FriendCard}>
                    <Grid md={8}>
                        <Typography>
                            {course.username}
                        </Typography>
                        <Typography>
                            {course.selfIntro}
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
                            onClick={() => handleOpen(course.courseId)}
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

export default CoursePage;