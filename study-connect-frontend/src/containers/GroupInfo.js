import { React, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  Modal,
  TextField,
  Paper
} from '@mui/material';
import instance from '../instance';
import MeetingModal from '../components/MeetingModal';
import AnnouncementModal from '../components/AnnouncementModal';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const BigCard = {
    // padding: '10px',
    width: '50%',
    margin: '20px',
    alignItems: 'flex-start',
    display: 'flex', 
    flexDirection: 'row',
    paddingBottom: '25px',
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
    paddingLeft: '15px',
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
    paddingLeft: '15px',
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

const announcement = [
    {uid: 1, announcement: '資料庫是一門好課'},
    {uid: 2, announcement: '十分推薦大家修習資料庫'},
    {uid: 3, announcement: '孔令傑是一位好老師'},
    {uid: 4, announcement: '我喜歡資料庫'},
]

const userInfo = {Name: "黃偉祥", ID: "B10705010", Role: '組員', Job: '買便當'}

const groupMember = [
    {Name: "黃偉祥", ID: "B10705010", Role: '組長'},
    {Name: "簡睦人", ID: "B10705009", Role: '組員'},
    {Name: "陳冠廷", ID: "B10705008", Role: '組員'},
    {Name: "陳宜君", ID: "B10705008", Role: '組員'},
    {Name: "陳玉翰", ID: "B10705007", Role: '組員'},
]

const toBeVotedMeeting = [
    {uid: 1, meetingName: '第一次會議'},
    {uid: 2, meetingName: '第二次會議'},
    {uid: 3, meetingName: '第三次會議'},
]

const votedMeeting = [
    {uid: 4, meetingName: '第四次會議', date: '2021/10/10', from_time: '10:00', to_time: '12:00'},
    {uid: 5, meetingName: '吃午餐', date: '2021/10/11', from_time: '10:00', to_time: '12:00'},
    {uid: 6, meetingName: '哭一整天', date: '2021/10/12', from_time: '10:00', to_time: '12:00'},
]

const renderMembers = (role) => {
    return groupMember.map((member) => {
        if (member.Role === role) {
            return (
                <Box sx={Normaltext}>
                    {member.Name}
                </Box>
            )
        }
    })
}


const course = {semester: '110-1', courseName: '資料庫管理', courseID: 'CSIE5430', 
courseInfo: "打開系網➡️系所成員➡️專任師資➡️找到教授➡️複製他的email➡️打開gmail ➡️收件者欄位貼上email➡️開始寫信 \n Dear 教授 嗚嗚嗚拜託不要當我好不好🥺 我都有去上課欸😭😭期中我已經唸的很認真了😢😢差這一門課就可以畢業了🥺🥺我會好好認真讀書😭不要當我好嗎😭😭🙏🙏嗚嗚嗚"}

    
const GroupInfoPage = ({userID, groupID}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [editSetVote, SetVote] = useState(false);
    const [openMeetingModel, setOpenMeetingModel] = useState(false);
    const [openAnnouncementModel, setOpenAnnouncementModel] = useState(false);

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

    const handleOpenAnnouncement = () => {
        //setInvatations();
        console.log("open announcement model");
        setOpenAnnouncementModel(true);
    };

    const handleOpenMeeting = () => {
        //setInvatations();
        console.log("open meeting model");
        setOpenMeetingModel(true);
    }
    
    return (
        <Container sx={MainContainer}>
            {/* Course Group Title */}
            <Typography variant="h5" fontWeight={800} sx={{ mt: '30px', textAlign: 'center' }}>
                Course Group 1
            </Typography>

            {/* on hover, show more course info */}
            <Grid item xs={12} sx={{ paddingTop: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative'}}
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
                        {course.courseName}
                    </Box>
                    <Typography sx={GreySubtitle}>
                        課程學期
                    </Typography>
                    <Box sx={Normaltext}>
                        {course.semester}
                    </Box>
                    <Typography sx={GreySubtitle}>
                        課程代碼
                    </Typography>
                    <Box sx={Normaltext}>
                        {course.courseID}
                    </Box>
                    <Typography sx={GreySubtitle}>
                        課程資訊
                    </Typography>
                    <Box sx={Normaltext}>
                        {course.courseInfo}
                    </Box>
                </Box>
        </span>
      )}
                <Paper elevation={0} style={{ paddingTop: '2px', paddingBottom: '2px', paddingLeft: '5px', paddingRight: '20px' }}>
                    {/* Semester Badge */}
                    <Typography variant="body1" style={{ borderRadius: '20px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '5px', paddingRight: '5px', textAlign: 'center', border: '1px solid #ccc', fontSize: "13px" }}>
                        {course.semester} <br />
                    </Typography>
                </Paper>
                {/* Course Name */}
                <Typography variant="subtitle2" sx={{ lineHeight: '1.6' }}>
                    {course.courseName}
                </Typography>
            </Grid>

            {/* Announcements */}
            <Grid item xs={12} sx={{paddingBottom: "20px"}}>
                {announcement.map((item) => (
                    <Box key={item.uid} sx={{ paddingTop: '20px', display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                        {/* Announcement Badge */}
                        <Typography style={{ paddingRight: '40px' }}>
                            <Box color='primary' style={{ borderRadius: '20px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '5px', paddingRight: '5px', textAlign: 'center', fontSize: "13px" }}>
                                公告
                            </Box>
                        </Typography>
                        {item.announcement}
                    </Box>
                ))}
            </Grid>

            {/* Group Information and Meetings */}
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                {/* Left side: Group Information */}
                <Grid sx={BigCard}>
                    <Box sx={GroupInfoCard}>
                        <Typography sx={SmallTitle}>
                            你在課程小組內的角色
                        </Typography>
                        <Typography sx={GreySubtitle}>
                                Your role
                        </Typography>
                        <Box sx={Normaltext}>
                            {userInfo.Role}
                        </Box>
                        <Typography 
                            sx={GreySubtitle}>
                                Your job
                        </Typography>
                        <Box sx={Normaltext}>
                            {userInfo.Job}
                        </Box>
                    </Box>

                    {/* Group Members */}
                    <Box sx={GroupInfoCard}>
                        <Typography sx={SmallTitle}>
                            小組成員
                        </Typography>

                        <Typography sx={GreySubtitle}>
                            組長
                        </Typography>
                        {renderMembers('組長')}

                        <Typography sx={GreySubtitle}>
                            組員
                        </Typography>
                        {renderMembers('組員')}
                    </Box>
                </Grid>

                {/* Right side: Meetings Information */}
                <Grid sx={BigCard}>
                    <Box sx={MeetingInfoCard}>

                        <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column', width: '100%',}}>
                            <Typography sx={SmallTitle}>
                                待投票會議
                            </Typography>

                            <Typography sx={GreySubtitle}>
                            </Typography>

                            {toBeVotedMeeting.map((meeting) => (
                            <Box sx={{display:'flex', flexDirection:'column', width: '100%', alignItems: 'center'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                                    <Typography  key={meeting.uid} sx={Normaltext}>
                                        {meeting.meetingName}
                                    </Typography>
                                    <Box flex = {0.23} paddingBottom={'5px'}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleVote(meeting.uid)}
                                            sx={{
                                                width: '70px',
                                                height: '20px',
                                                borderRadius: '30px',
                                                textTransform: 'none',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                }}
                                        >
                                                Vote
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column',width: '100%', }}>
                            <Typography sx={SmallTitle}>
                                已投票會議
                            </Typography>

                            <Typography sx={GreySubtitle}>
                            </Typography>
                            
                            {votedMeeting.map((meeting) => (
                                <Box key={meeting.uid} sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                }}>
                                    <Box sx={{ flex: 0.3 }}>
                                        <Typography sx={Normaltext} >
                                            {meeting.meetingName}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 , textAlign: 'left'}}>
                                        <Typography sx={Normaltext}>
                                            {meeting.date} {meeting.from_time} - {meeting.to_time}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Box>

            <Button
                id="confirm-update-button"
                size="small"
                variant="contained"
                color="primary"
                onClick={handleOpenMeeting}
                sx={{
                    width: '100px',
                    height: '50px',
                    borderRadius: '30px',
                    mt: '25px',
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                }}
            >
                發起會議
            </Button>
            <MeetingModal open={openMeetingModel} setOpen={setOpenMeetingModel} />

            <Button
                id="confirm-update-button"
                size="small"
                variant="contained"
                color="secondary"
                onClick={handleOpenAnnouncement}
                sx={{
                    width: '100px',
                    height: '50px',
                    borderRadius: '30px',
                    mt: '25px',
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                }}
            >
                發起公告
            </Button>
            <AnnouncementModal open={openAnnouncementModel} setOpen={setOpenAnnouncementModel}/>
        </Container>
    );
}

export default GroupInfoPage;
