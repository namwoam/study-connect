import { React, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material';

import InformationModal from '../components/InformationModal';
import GroupCard from '../components/GroupCard';

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

//SQL: use joingroup, group, course to get group{groupName}, joingroup{job}, course{courseName, semester}
const Groups = [
    {uid: 1, groupName: 'group1', courseName: '資料庫管理', semester: '112-1', jobs: ['Data']},
    {uid: 2, groupName: 'group2', courseName: '網路服務程式設計', semester: '112-1', jobs: ['Frontend', 'Backend']},
    {uid: 3, groupName: 'group3', courseName: '網路', semester: '112-1', jobs: ['Research', 'Analysis', 'Report']},
    {uid: 4, groupName: 'group4', courseName: '演算法設計與分析', semester: '112-1', jobs: ['Design', 'Content']},
    {uid: 5, groupName: 'group5', courseName: '資訊安全概論', semester: '112-1', jobs: ['Planning', 'Execution']},
    {uid: 6, groupName: 'group6', courseName: '演算法', semester: '112-1', jobs: ['Customer', 'Issue']},
    {uid: 7, groupName: 'group7', courseName: '會計學甲上', semester: '112-1', jobs: ['Marketing', 'Management', 'Analytics']}
]



const GroupPage = ({userID}) => {
    return(
        <Container sx={MainContainer} maxWidth="xl" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2}>
                <Grid con md={6}>
                    <Typography variant="h5" fontWeight={800} sx={{ mt: '30px' }} style={{textAlign: 'center'}}>
                        Your Groups
                    </Typography>
                    {Groups.map((group, index) => (
                        <GroupCard group={group} id={index} key={index} />
                    ))}
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h5" fontWeight={800} sx={{ mt: '30px' }} style={{textAlign: 'center'}}>
                        Course Groups Open To You
                    </Typography>
                    {Groups.map((group, index) => (
                        <GroupCard group={group} id={index} key={index} />
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}

export default GroupPage;