import { React, useState, useEffect } from 'react';
import { Box, Grid, Snackbar, Typography, Button, Container } from '@mui/material';
import instance from '../instance';
import GroupCard from '../components/GroupCard';
import GroupInfoPage from './GroupInfo';
import CreateGroupModal from '../components/CreateGroupModal';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const GroupPage = ({userID}) => {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [enterGroup, setEnterGroup] = useState(false);
    const [groupDetailId, setGroupDetailId] = useState(null);
    const [openCreateGroupModel, setOpenCreateGroupModel] = useState(false);
    const [courseOptions, setCourseOptions] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleOpenCreateGroup = () => {
        fetchEnrolledCourses(userID);
        setOpenCreateGroupModel(true);
    }

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

    const fetchJoinedGroups = async () => {
        try {
            const response = await instance.get(`/user/joined_groups/${userID}`);
            if (response.data.success) {
                let groups = [];
                let joinedGroups = response.data.data.groups;
                joinedGroups.forEach((group) => {
                    groups.push({id: group[0], groupName: group[1], courseName: group[4], semester: group[5]})
                })
                setJoinedGroups([...groups]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchJoinedGroups();
    }, [userID, enterGroup]);

    const handlePublish = async (GroupName, MaximumMember, CourseID) => {
        try {
            const response = await instance.post('/group/create', {
                user: userID,
                group_name: GroupName,
                capacity: MaximumMember,
                course_id: CourseID,
            });
            if (response.data.success) {
                fetchJoinedGroups();
                setAlertMessage('Course group created successfully');
                setOpenSnackbar(true);
            } else {
                setAlertMessage('Failed to create course group');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <Container sx={MainContainer}>
            {enterGroup && groupDetailId ? 
                <GroupInfoPage userID={userID} groupID={groupDetailId} setEnterGroup={setEnterGroup}/>
                :
                <>
                    <Typography variant="h5" fontWeight={800} sx={{my: '30px', textAlign: 'center'}}>
                        Your Groups
                    </Typography>
                    <Button
                        // size="small"
                        variant="contained"
                        color='primary'
                        onClick={handleOpenCreateGroup}
                        sx={{
                            size: 'small',
                            width: '150px',
                            textTransform: 'none',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        創建新課程小組
                    </Button> 
                    <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mt: '20px' }}>
                        {joinedGroups.length > 0 && joinedGroups.map((group, index) => (
                            <GroupCard group={group} setGroupDetailId={setGroupDetailId} setEnterGroup={setEnterGroup} id={index} key={index} />
                        ))}
                    </Box>
                    <CreateGroupModal 
                        open={openCreateGroupModel} 
                        setOpen={setOpenCreateGroupModel}
                        courseOptions={courseOptions}
                        handlePublish={handlePublish}
                    />
                </>
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

export default GroupPage;