import { React, useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Container, TextField, Autocomplete, Snackbar } from '@mui/material';
import instance from '../instance';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const GroupCard = {
    padding: '15px', 
    width: '600px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

const CoursePage = ({userID}) => {
    const [courseOptions, setCourseOptions] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseGroups, setCourseGroups] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };

    const fetchEnrolledCourses = async () => {
        try {
            const response = await instance.get(`/user/enrolled_courses/${userID}`);
            if (response.data.success) {
                let courses = [];
                let enrolledCourses = response.data.data.courses;
                enrolledCourses.forEach((course) => {
                    courses.push({id: course[0], label: course[1]})
                })
                setCourseOptions([...courses]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGroupsInCourse = async () => {
        
        try {
            const response = await instance.get(`/course/list_groups/${selectedCourse.id}`);
            if (response.data.success) {
                let groups = [];
                let selectedcourseGroups = response.data.data.groups;
                selectedcourseGroups.forEach((group) => {
                    groups.push({id: group})
                })
                setCourseGroups([...groups]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sendJoinGroupRequest = async (groupId) => {
        try {
            const response = await instance.post('/group/send_request', {
                user: userID,
                group_id: toString(groupId),
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

    useEffect(() => {
        fetchEnrolledCourses();
    }, [userID]);
    
    useEffect(() => {
        if (selectedCourse !== null) {
            console.log(selectedCourse);
            fetchGroupsInCourse();
        }
    }, [selectedCourse]);

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Discover Course Groups
            </Typography>
            <Autocomplete
                size='small'
                sx={{ width: '400px', marginTop: '30px', marginBottom: '30px' }}
                options={courseOptions}
                getOptionLabel={(option) => `${option.id} ${option.label}`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="Check available groups in your course" />}
                onChange={(event, newValue, reason) => {
                    setSelectedCourse(reason === "clear" || reason === "removeOption" ? null : newValue);
                }}
                value={selectedCourse}
            />
            <Box sx={{ maxHeight: '65vh', overflowY: 'auto'}}>
                {selectedCourse && courseGroups.map((group) => (
                    <Grid container spacing={2} sx={GroupCard} key={group.id}>
                        <Grid md={8}>
                            <Typography>
                                {group.id}
                            </Typography>
                            <Typography>
                                {group.id}
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
                                sx={{width: '160px', mb: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                                onClick={() => sendJoinGroupRequest(group.id)}
                            >
                                Join Course Group!
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Box>
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

export default CoursePage;