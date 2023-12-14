import { React, useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material';
import instance from '../instance';
import GroupCard from '../components/GroupCard';
import GroupInfoPage from './GroupInfo';

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
    }, [userID]);

    return(
        <Container sx={MainContainer}>
            {enterGroup && groupDetailId ? 
                <GroupInfoPage userID={userID} groupID={groupDetailId} setEnterGroup={setEnterGroup}/>
                :
                <>
                    <Typography variant="h5" fontWeight={800} sx={{mt: '30px', textAlign: 'center'}}>
                        Your Groups
                    </Typography>
                    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', mt: '20px' }}>
                        {joinedGroups.length > 0 && joinedGroups.map((group, index) => (
                            <GroupCard group={group} setGroupDetailId={setGroupDetailId} setEnterGroup={setEnterGroup} id={index} key={index} />
                        ))}
                    </Box>
                </>
            }
        </Container>
    );
}

export default GroupPage;