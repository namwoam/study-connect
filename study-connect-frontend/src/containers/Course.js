import { React, useState, useEffect } from 'react';
import { Typography, Button, Container, TextField, Autocomplete, Snackbar } from '@mui/material';
import CourseGroupView from '../components/CourseGroupView';
import CourseMemberView from '../components/CourseMemberView';
import instance from '../instance';
import { fetchUserInfo } from '../utils/fetchUser';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const CoursePage = ({userID}) => {
    const [courseOptions, setCourseOptions] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseGroups, setCourseGroups] = useState([]);
    const [courseMembers, setCourseMembers] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [selectType, setSelectType] = useState(1);

    const toggleView = () => {
        setSelectType((prevType) => (prevType === 1 ? 2 : 1));
    };
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
                    groups.push({groupId: group[0], groupName: group[1], currentCnt: group[2], groupCapacity: 5})
                })
                setCourseGroups([...groups]);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const fetchMembersInCourse = async () => {
        try {
            const response = await instance.get(`/course/list_students/${selectedCourse.id}`);
            if (response.data.success) {
                let members = [];
                let selectedcourseMembers = response.data.data.students;
                console.log(selectedcourseMembers);
                selectedcourseMembers.forEach((member) => {
                    const friendInfo = fetchUserInfo(member);
                    console.log(friendInfo);
                    members.push({uid: member})
                })
                setCourseMembers([...members]);
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
            switch (selectType) {
                case 1:
                    fetchGroupsInCourse();
                    break;
                case 2:
                    fetchMembersInCourse()
                    break;
                default:
                    break;
            }
        }
    }, [selectedCourse]);

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                {selectType === 1 ? 'Discover Course Groups' : 'Discover Course Members'}
            </Typography>
            <Button
                variant="outlined"
                color={selectType === 1 ? "primary" : "secondary"}
                onClick={toggleView}
                sx={{ mt: '20px', textTransform: 'none', fontSize: '14px', fontWeight: 600 }}
            >
                {selectType === 1 ? 'Switch to Discover Course Members' : 'Switch to Discover Course Groups'}
            </Button>
            <Autocomplete
                size='small'
                sx={{ width: '400px', marginTop: '25px', marginBottom: '30px' }}
                options={courseOptions}
                getOptionLabel={(option) => `${option.id} ${option.label}`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="Check available groups in your course" />}
                onChange={(event, newValue, reason) => {
                    setSelectedCourse(reason === "clear" || reason === "removeOption" ? null : newValue);
                }}
                value={selectedCourse}
            />
            {
                selectType == 1 && selectedCourse ? 
                <CourseGroupView selectedCourse={selectedCourse} courseGroups={courseGroups} sendJoinGroupRequest={sendJoinGroupRequest}/>
                :
                selectType == 2 && selectedCourse ?
                <CourseMemberView selectedCourse={selectedCourse} courseMembers={courseGroups} sendJoinGroupRequest={sendJoinGroupRequest}/>
                :
                <></>
            }
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