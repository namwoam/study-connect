import { React, useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material';
import instance from '../instance';
import GroupCard from '../components/GroupCard';

const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

//test: B10102025
//SQL: use joingroup, group, course to get group{groupName}, joingroup{job}, course{courseName, semester}
// const Groups = [
//     {uid: 1, groupName: 'group1', courseName: '資料庫管理', semester: '112-1', jobs: ['Data']},
//     {uid: 2, groupName: 'group2', courseName: '網路服務程式設計', semester: '112-1', jobs: ['Frontend', 'Backend']},
//     {uid: 3, groupName: 'group3', courseName: '網路', semester: '112-1', jobs: ['Research', 'Analysis', 'Report']},
//     {uid: 4, groupName: 'group4', courseName: '演算法設計與分析', semester: '112-1', jobs: ['Design', 'Content']},
//     {uid: 5, groupName: 'group5', courseName: '資訊安全概論', semester: '112-1', jobs: ['Planning', 'Execution']},
//     {uid: 6, groupName: 'group6', courseName: '演算法', semester: '112-1', jobs: ['Customer', 'Issue']},
//     {uid: 7, groupName: 'group7', courseName: '會計學甲上', semester: '112-1', jobs: ['Marketing', 'Management', 'Analytics']}
// ]



const GroupPage = ({userID}) => {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [groupInfo, setGroupInfo] = useState([]);

    const fetchJoinedGroups = async () => {
        try {
            const response = await instance.get(`/user/joined_groups/${userID}`);
            if (response.data.success) {
                let groups = [];
                let joinedGroups = response.data.data.groups;
                console.log(joinedGroups);
                joinedGroups.forEach((group) => {
                    groups.push({id: group[0], groupName: group[1], courseName: '會計學甲上', semester: '112-1'})
                })
                console.log(groups)
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
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px', textAlign: 'center'}}>
                Your Groups
            </Typography>
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto', mt: '20px' }}>
                {joinedGroups.length > 0 && joinedGroups.map((group, index) => (
                    <GroupCard group={group} id={index} key={index} />
                ))}
            </Box>
        </Container>
    );
}

export default GroupPage;