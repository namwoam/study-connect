import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';

const GroupCardStyle = {
    padding: '15px', 
    paddingLeft: '0px',
    paddingTop: '0px',
    width: '700px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

const GroupCard = ({ group, setGroupDetailId, setEnterGroup }) => {
    const handleEnter = (id) => {
        setGroupDetailId(id);
        setEnterGroup(true);
    }
  return (
    <Grid container spacing={3} sx={GroupCardStyle}>
        {/* Group Name, Semester, Course Name */}
        <Grid item md={10}>
            <Typography variant="h5" gutterBottom>
                {group.groupName}
            </Typography>
            <Box sx={{display: 'flex'}}>
                <Typography variant="subtitle2" sx={{marginRight: '5px'}}>
                    {group.semester}
                </Typography>
                <Typography variant="subtitle2">
                    {group.courseName}
                </Typography>
            </Box>
        </Grid>

        {/* Jobs */}
        {/* <Grid md={6} sx={{display: 'flex', marginTop: '-20px'}}>
        {group.jobs.map((job, index) => (
            <Paper elevation={0} style={{ borderRadius: '10px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '6px', paddingRight: '6px', marginRight: '10px', textAlign: 'center', background: '#B9B9B9' }}>
                <Typography variant="subtitle2" fontWeight={600} color={'white'}>{job}</Typography>
            </Paper>
        ))}
        </Grid> */}

        {/* Enter Button */}
        <Grid item md={2} container style={{ alignItems: 'center', justifyContent: 'center'}}>
            <Button
                size='small'
                maxHeight='10px'
                variant="contained"
                color='primary'
                onClick={() => handleEnter(group.id)}
                sx={{width: '100px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
            >
                Enter
            </Button>
        </Grid>
    </Grid>
    // <Paper elevation={3} style={{ padding: '15px', margin: '20px', height: '12%' }}>
    // </Paper>
  );
};

export default GroupCard;
