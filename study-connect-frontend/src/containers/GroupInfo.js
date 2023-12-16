import { React, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  Modal,
  Snackbar,
  Paper
} from '@mui/material';
import instance from '../instance';
import MeetingModal from '../components/MeetingModal';
import AnnouncementModal from '../components/AnnouncementModal';
import EditRoleModal from '../components/EditRoleModal';
import EditJobModal from '../components/EditJobModal';
import KickMemberModal from '../components/KickMemberModal';


const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const BigCard = {
    // padding: '10px',
    width: '50%',
    margin: '10px',
    alignItems: 'flex-start',
    display: 'flex', 
    flexDirection: 'row',
    paddingBottom: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    borderRadius: '10px',
};

const GroupInfoCard = {
    width: '50%',
    height: '95%',
    margin: '20px',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '25px',
    border: '1px solid #ccc', 
    borderRadius: '10px',
    padding: '15px',
};

const MeetingInfoCard = {
    width: '100%',
    height: '95%',
    margin: '20px',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '25px',
    border: '1px solid #ccc', 
    borderRadius: '10px',
    padding: '15px',
};

const SmallTitle = {
    mt: '20px',
    paddingBottom: '20px',
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 17
}

const GreySubtitle = { 
    fontSize: 12,
    color: '#BBB'
}

const Normaltext = { 
    fontSize: 15,
    paddingBottom: '5px',
}
    
const GroupInfoPage = ({userID, groupID, setEnterGroup}) => {
    const [groupName, setGroupName] = useState("");
    const [courseID, setCourseID] = useState("");
    const [courseInfo, setCourseInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [groupMember, setGroupMember] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [meetings, setMeetings] = useState([]);

    const fetchGroupInfo = async () => {
        try {
            const response = await instance.get(`/info/group/${groupID}`);
            if (response.data.success) {
                let courseGroup = response.data.data;
                let members = courseGroup.members;
                console.log(courseGroup);
                setGroupName(courseGroup.group_name);
                setCourseID(courseGroup.course_id);
                setGroupMember([...courseGroup.members]);
                setAnnouncements([...courseGroup.announcements]);
                setMeetings([...courseGroup.meets]);

                const user = members.filter(member => member.student_id === userID)[0];
                setUserInfo(user);
                console.log("user:", userInfo);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGroupInfo();
    }, [groupID]);

    const fetchCourseInfo = async (cid) => {
        try {
          const response = await instance.get(`/info/course/${cid}`);
          if (response.data.success) {
            setCourseInfo(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching course information:', error);
        }
    };

    useEffect(() => {
        if (courseID != "") {
            fetchCourseInfo(courseID);
        }
    }, [courseID])

    const renderMembers = (role) => {
        //console.log(role)
        return groupMember.map((member) => {
            if ((userInfo.role === "Leader") && (member.role === "Member") && (member.role === role)) {
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between',alignItems: 'center', paddingBottom: '5px',}}>
                        <Box sx={{fontSize: 15, width: "30%"}}>
                            {member.student_id} {member.name}
                        </Box>
                        <Box sx={{width: "50%"}} flex = {0.5}>
                            <Button sx={{ height:"20px", width:"60px",fontWeight:400, fontSize: "12px"}} variant="contained" color="inherit"
                            onClick={() => handleRemoveMember(member)}>
                                Remove
                            </Button>
                        </Box>
                    </Box>
                )
            }
            else if (member.role === role) {
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between',alignItems: 'center', paddingBottom: '5px',}}>
                        <Box sx={{fontSize: 15, width: "30%"}}>
                        {member.student_id} {member.name}
                        </Box>
                        <Box sx={{width: "30%"}} flex = {0.5}>
                    </Box>
                </Box>
                )
            }
        })
    }
    
    const [isHovered, setIsHovered] = useState(false);
    const [editSetVote, SetVote] = useState(false);
    const [openMeetingModel, setOpenMeetingModel] = useState(false);
    const [openAnnouncementModel, setOpenAnnouncementModel] = useState(false);
    const [openEditRoleModel, setOpenEditRoleModel] = useState(false);
    const [openEditJobModel, setOpenEditJobModel] = useState(false);
    const [openKickMemberModal, setOpenKickMemberModal] = useState(false);
    const [kickedMember, setKickedMember] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleVote = (MeetingID) => {
        SetVote(MeetingID);
        console.log('Vote', MeetingID);
    };

    const handleBackToGroups = () => {
        setEnterGroup(false);
    };

    const handleOpenAnnouncement = () => {
        //setInvatations();
        console.log("open announcement model");
        setOpenAnnouncementModel(true);
    };

    const handleOpenMeeting = () => {
        console.log("open meeting model");
        setOpenMeetingModel(true);
    }

    const handleOpenEditRole = () => {
        console.log("open edit role model");
        setOpenEditRoleModel(true);
    }

    const handleOpenEditJob = () => {
        console.log("open edit job model");
        setOpenEditJobModel(true);
    }

    const handleRemoveMember = (member) => {
        setKickedMember(member);
        setOpenKickMemberModal(true);
    }

    const handleKickMember = async () => {
        try {
            const response = await instance.post('/group/kick',
                {
                    user: kickedMember.student_id,
                    group_id: String(groupID),
                });
            if (response.status == 200) {
                fetchGroupInfo();
                setAlertMessage(`Kicked Member ${kickedMember.name} successfully`);
                setOpenSnackbar(true);
            } else {
                setAlertMessage(`Failed to kick Member ${kickedMember.name}`);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleLeaveGroup = async () => {
        try {
            const response = await instance.post('/group/kick',
                {
                    user: userID,
                    group_id: String(groupID),
                });
            if (response.status == 200) {
                setEnterGroup(false);
            } else {
                setAlertMessage(`Failed to kick Member ${kickedMember.name}`);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handlePublishMeeting = async (meetInfo) => {
        try {
            const response = await instance.post('/group/meeting/create',
                {
                    user: userID,
                    meet_name: meetInfo.meetName,
                    group_id: String(groupID),
                    start_time: meetInfo.startTime,
                    end_time: meetInfo.endTime
                });
            if (response.status == 200) {
                fetchGroupInfo();
                setAlertMessage('Meeting published successfully');
                setOpenSnackbar(true);
            } else {
                setAlertMessage('Failed to publish a meeting');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePublishAnnouncement = async (content) => {
    try {
        const response = await instance.post('/group/announcement/create',
            {
                user: userID,
                content: content,
                group_id: String(groupID),
            });
        if (response.status == 200) {
            fetchGroupInfo();
            setAlertMessage('Announcement published successfully');
            setOpenSnackbar(true);
        } else {
            setAlertMessage('Failed to publish announcement');
            setOpenSnackbar(true);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    };

    
    return (
        <Container sx={MainContainer}>
        { courseInfo && 
        <>
            {/* Course Group Title */}
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', paddingTop: '50px', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{width: "30%"}}>
                    <Button
                    onClick={handleBackToGroups}>
                        Back To Your Groups
                    </Button>
                </Box>
                <Box sx={{width: "30%"}}>
                    <Typography variant="h5" fontWeight={800} sx={{ textAlign: 'center' }}>
                        {groupName}
                    </Typography>
                </Box>
                <Box sx={{width: "30%", display:'flex', justifyContent: 'right', paddingRight: '15px'}}>
                    <Button
                        id="confirm-update-button"
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenMeeting}
                        sx={{
                            width: '100px',
                            height: '30px',
                            borderRadius: '30px',
                            marginRight: '10px',
                            textTransform: 'none',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        發起會議
                    </Button> 
                    <Button
                        id="confirm-update-button"
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenAnnouncement}
                        sx={{
                            width: '100px',
                            height: '30px',
                            borderRadius: '30px',
                            textTransform: 'none',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        發起公告
                    </Button>
                </Box>
            </Box>


            {/* on hover, show more course info */}
            <Grid item xs={12} sx={{ cursor: 'help', paddingTop: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative'}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                {isHovered && (
                    <span
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        width: '300px',
                        transform: 'translateX(-50%)',
                        background: '#fff',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                    }}>
                    <Box>
                        <Typography sx={GreySubtitle}>
                            課程名稱
                        </Typography>
                        <Box sx={Normaltext}>
                            {courseInfo.course_name}
                        </Box>
                        <Typography sx={GreySubtitle}>
                            課程學期
                        </Typography>
                        <Box sx={Normaltext}>
                            {courseInfo.semester}
                        </Box>
                        <Typography sx={GreySubtitle}>
                            課程代碼
                        </Typography>
                        <Box sx={Normaltext}>
                            {courseInfo.course_id}
                        </Box>
                        <Typography sx={GreySubtitle}>
                            教授姓名
                        </Typography>
                        <Box sx={Normaltext}>
                            {courseInfo.instructor_name}
                        </Box>
                        <Typography sx={GreySubtitle}>
                            開課系所
                        </Typography>
                        <Box sx={Normaltext}>
                            {courseInfo.department_name}
                        </Box>
                    </Box>
                    </span>
                )}
                <Paper elevation={0} style={{ paddingTop: '2px', paddingBottom: '2px', paddingLeft: '5px', paddingRight: '20px' }}>
                    <Typography variant="body1" style={{ borderRadius: '20px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '5px', paddingRight: '5px', textAlign: 'center', border: '1px solid #ccc', fontSize: "13px" }}>
                        {courseInfo.semester} <br />
                    </Typography>
                </Paper>
                <Typography variant="subtitle2" sx={{ lineHeight: '1.6' }}>
                    {courseInfo.course_name}
                </Typography>
            </Grid>

            {/* Announcements */}
            <Grid item xs={12} sx={{ paddingTop: '10px', paddingBottom: "20px"}}>
                {announcements.length > 0 ? announcements.map((item, idex) => (
                    <Box key={idex} sx={{ paddingTop: '20px', display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                        {/* Announcement Badge */}
                        <Box style={{ paddingRight: '40px' }}>
                            <Typography backgroundColor="#F5F5F5" style={{ borderRadius: '20px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '5px', paddingRight: '5px', textAlign: 'center', fontSize: "13px" }}>
                                公告
                            </Typography>
                        </Box>
                        {item}
                    </Box>
                ))
                :
                <Box sx={Normaltext}>
                    目前尚無公告事項！
                </Box>
                }
            </Grid>

            {/* Group Information and Meetings */}
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                {
                userInfo &&
                <Grid sx={BigCard}>
                    <Box sx={GroupInfoCard}>
                        <Typography sx={SmallTitle}>
                            你在課程小組內的角色
                        </Typography>
                        <Typography sx={GreySubtitle}>
                                Your role
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between',alignItems: 'center', paddingBottom: '5px',}}>
                            <Box sx={{fontSize: 15, width: "40%"}}>
                                {userInfo.role}
                            </Box>
                            <Box sx={{width: "30%"}} flex = {0.5}>
                            {userInfo.role === 'Leader' && (
                                <Box>
                                    <Button 
                                        sx={{ height: "20px", width: "50px", fontWeight: 400, fontSize: "12px" }}
                                        variant="contained"
                                        color="inherit"
                                        onClick={handleOpenEditRole}>
                                            Edit
                                    </Button>
                                    <EditRoleModal open={openEditRoleModel} setOpen={setOpenEditRoleModel} groupMember={groupMember} groupID={groupID}/>
                                </Box>
                            )}
                            </Box>
                        </Box>
                        <Typography sx={GreySubtitle}>
                            Your job
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between',alignItems: 'center', paddingBottom: '5px',}}>
                            <Box sx={{fontSize: 15, width: "40%"}}>
                                {userInfo.job === "Undecided" ? "No job :)" : userInfo.Job}
                            </Box>
                            <Box sx={{width: "30%"}} flex = {0.5}>
                                {userInfo.role === 'Leader' && (
                                <Box>
                                    <Button 
                                    sx={{ height: "20px", width: "50px", fontWeight: 400, fontSize: "12px" }}
                                        variant="contained"
                                        color="inherit"
                                        onClick={handleOpenEditJob}>
                                        Edit
                                    </Button>
                                    <EditJobModal open={openEditJobModel} setOpen={setOpenEditJobModel} groupMember={groupMember} groupID={groupID}/>
                                </Box>
                                )}
                            </Box>
                        </Box>
                        {userInfo.role !== 'Leader' ? 
                        <Button
                            size='small'
                            variant="contained"
                            color='primary'
                            onClick={() => handleLeaveGroup()}
                            sx={{width: '100px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                        >
                            退出小組
                        </Button>
                        : 
                        <></>
                        }
                    </Box>

                    {/* Group Members */}
                    <Box sx={GroupInfoCard}>
                        <Typography sx={SmallTitle}>
                            小組成員
                        </Typography>
                        
                        <Typography sx={GreySubtitle}>
                            組長
                        </Typography>
                        {renderMembers('Leader')}

                        <Typography sx={GreySubtitle}>
                            組員
                        </Typography>
                        {renderMembers('Member')}

                    </Box>
                </Grid>
                }
                {/* Right side: Meetings Information */}
                <Grid sx={BigCard}>
                    <Box sx={MeetingInfoCard}>

                        <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column',width: '100%', }}>
                            <Typography sx={SmallTitle}>
                                已排定會議
                            </Typography>
                            
                            {meetings.length > 0 ? meetings.map((meeting, index) => (
                                <Box key={index} sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Box sx={{ paddingLeft: "10px" , width: "30%"}}>
                                        <Typography sx={Normaltext} >
                                            {meeting.meet_name}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'left', width: "55%"}}>
                                        <Typography sx={Normaltext}>
                                            {meeting.start_time} - {meeting.end_time}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                            :
                            <Box sx={Normaltext}>
                                目前尚無排定之會議！
                            </Box>
                            }
                        </Box>
                    </Box>
                </Grid>
            </Box>

            <MeetingModal open={openMeetingModel} setOpen={setOpenMeetingModel} handlePublishMeeting={handlePublishMeeting} />
            <AnnouncementModal open={openAnnouncementModel} setOpen={setOpenAnnouncementModel} handlePublishAnnouncement={handlePublishAnnouncement}/>
            {openKickMemberModal && <KickMemberModal open={openKickMemberModal} setOpen={setOpenKickMemberModal} member={kickedMember} handleKickMember={handleKickMember}/>}
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
        </>
        }
        </Container>
    );
}

export default GroupInfoPage;
