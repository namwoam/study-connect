import { React, useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Container, TextField, Autocomplete, duration } from '@mui/material';
import instance from '../instance';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const GroupCard = {
    padding: '15px', 
    width: '800px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

const CoursePage = ({userID}) => {
    const [courseOptions, setCourseOptions] = useState([
        {id: 1, label: '資料庫管理'},
        {id: 2, label: '網路技術與應用'},
        {id: 3, label: 'AAA'},
        {id: 4, label: 'd'},
        {id: 5, label: 'ff'},
        {id: 6, label: 'vv'},
        {id: 7, label: 'eee'},
    ]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseGroups, setCourseGroups] = useState([
        {courseId: 1, username: 'user1', selfIntro: 'Hi, my name is ...'},
        {courseId: 2, username: 'user2', selfIntro: 'Hi, my name is ...'},
        {courseId: 3, username: 'user3', selfIntro: 'Hi, my name is ...'},
        {courseId: 4, username: 'user3', selfIntro: 'Hi, my name is ...'},
        {courseId: 5, username: 'user3', selfIntro: 'Hi, my name is ...'},
        {courseId: 6, username: 'user3', selfIntro: 'Hi, my name is ...'},
        {courseId: 7, username: 'user3', selfIntro: 'Hi, my name is ...'}
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('fetching...');
        const fetchEnrolledCourses = async () => {
            try {
                const response = await instance.get(`/user/enrolled_courses/${userID}`);
                const enrolledCourses = response.data.data.courses;
                console.log(enrolledCourses);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEnrolledCourses();
    }, [userID]);
    
    // useEffect(() => {
    //     if (selectedCourse !== null) {
    //         console.log(selectedCourse);
    //         setTimeout(() => {
    //             setLoading(false);
    //         }, 3000)
          
    //         // fetch(`/api/course/list_groups?courseId=${selectedCourse.id}`)
    //         //     .then(response => response.json())
    //         //     .then(data => {
    //         //         setCourseGroups(data.groups);
    //         //         setLoading(false);
    //         //     })
    //         //     .catch(error => {
    //         //         console.error('Error fetching groups:', error);
    //         //         setLoading(false);
    //         //     });
    //     }
    // }, [selectedCourse]);

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Discover Course Groups
            </Typography>
            <Autocomplete
                size='small'
                sx={{ width: '400px', marginTop: '30px', marginBottom: '30px' }}
                options={courseOptions}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) =>
                    <TextField {...params} label="Check available groups in your course" />}
                onChange={(event, newValue, reason) => {
                    setSelectedCourse(reason === "clear" || reason === "removeOption" ? null : newValue);
                }}
                value={selectedCourse}
            />
            <Box sx={{ maxHeight: '65vh', overflowY: 'auto'}}>
                {loading && <p>Loading...</p>}
                {!loading && courseGroups.map((group, index) => (
                    <Grid container spacing={2} sx={GroupCard} key={index}>
                        <Grid md={8}>
                            <Typography>
                                {group.username}
                            </Typography>
                            <Typography>
                                {group.selfIntro}
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
                                sx={{width: '120px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                            >
                                Show More
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </Container>
        
    );
}

export default CoursePage;