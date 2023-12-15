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
    const [invatations, setInvatations] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const [alerts, setAlerts] = useState(false);
    const [openInfoModel, setOpenInfoModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");

    const handleInfoOpen = (friend) => {
        setSelectedUser(friend);
        setOpenInfoModel(true);
    }

    const fetchUserFriends = async () => {
        try {
            const response = await instance.get(`/user/friend/list/${userID}`);
            if (response.data.success) {
                let friendIDs = response.data.data.friends;
                
                const fetchFriendInfo = async (fid) => {
                    const friendInfo = await fetchUserInfo(fid);
                    const courseResponse = await instance.get(`/user/enrolled_courses/${fid}`);
                    if (courseResponse.data.success) {
                        if (friendInfo){
                            return { uid: fid, 
                                username: friendInfo.student_name, 
                                department: friendInfo.department_name, 
                                selfIntro: friendInfo.self_introduction ?? "",
                                courseRecords: courseResponse.data.data.courses,
                                ig_account: friendInfo.ig,
                                fb_account: friendInfo.fb
                            };
                        }
                        else {
                            return null;
                        }
                    }
                };
    
                const friendInfoArray = await Promise.all(friendIDs.map(fetchFriendInfo));
                let friends = friendInfoArray.filter(info => info !== null);
                setUserFriends([...friends]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFriendRequests = async (userID) => {
        try {
            const response = await instance.get(`/user/friend/list_requests/${userID}`);
            if (response.data.success) {
                let requestIDs = response.data.requests;

                const fetchFriendRequestInfo = async (requestID) => {
                    const friendInfo = await fetchUserInfo(requestID);
                    const courseResponse = await instance.get(`/user/enrolled_courses/${requestID}`);
                    if (courseResponse.data.success) {
                        return friendInfo ? {
                            uid: requestID,
                            username: friendInfo.student_name,
                            department: friendInfo.department_name,
                            selfIntro: friendInfo.self_introduction ?? "",
                            courseRecords: courseResponse.data.data.courses,
                        } : null;
                    }
                };
    
                const friendRequestInfoArray = await Promise.all(requestIDs.map(fetchFriendRequestInfo));
                const friendRequests = friendRequestInfoArray.filter(info => info !== null);
    
                setInvatations([...friendRequests]);
            }
        } catch (error) {
            console.log(error);
            // Handle error as needed
        }
    };

    useEffect(()=>{
        fetchUserFriends()
    }, [userID]);

    const handleOpen = () => {
        fetchFriendRequests(userID);
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
            <Typography variant="h5" fontWeight={800} sx={{my: '30px'}}>
                Your Friends
            </Typography>
            <Button size='small'
                maxHeight='10px'
                variant="contained"
                color='primary'
                sx={{width: '160px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                // position: 'absolute', top: '94px', right: '24%'
                onClick={handleOpen}
            >
                View Invitations
            </Button>
            <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mt: '20px' }}>
            {userFriends.length > 0 ? 
                userFriends.map((friend, index) => (   
                    <FriendCard friend={friend} handleInfoOpen={handleInfoOpen}/>
                ))
                : <Typography sx={{mt: '20px'}}>You don't have any friend now. QQ</Typography>
            }
            </Box>
            <InformationModal open={openInfoModel} setOpen={setOpenInfoModel} user={selectedUser}/>
            <FriendModal open={openModel} setOpen={setOpenModel} invatations={invatations} accept_friend={accept_friend} reject_friend={reject_friend} handleInfoOpen={handleInfoOpen}/>
        </Container>
        
    );
}

export default FriendPage;