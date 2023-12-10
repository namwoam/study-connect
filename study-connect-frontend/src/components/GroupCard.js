import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';

const GroupCard = ({ group, id }) => {
    const handleEnter = (id) => {
        console.log(id);
    }
  return (
    <Paper elevation={3} style={{ padding: '15px', margin: '20px', height: '12%' }}>
        <Grid container spacing={3}>
            {/* Group Name, Semester, Course Name */}
            <Grid item md={4}>
                <Typography variant="h5" gutterBottom>
                    {group.groupName}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant="subtitle2">
                            {group.semester}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">
                            {group.courseName}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            {/* Jobs */}
            <Grid item md={6} container spacing={2}>
            {group.jobs.map((job, index) => (
                <Grid item key={index} xs={4}>
                <Paper elevation={0} style={{ paddingTop: '2px', paddingBottom: '2px', textAlign: 'center', background: '#d0d0d0' }}>
                    <Typography variant="subtitle2">{job}</Typography>
                </Paper>
                </Grid>
            ))}
            </Grid>

            {/* Enter Button */}
            <Grid item md={2} container style={{ alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    size='small'
                    maxHeight='10px'
                    variant="contained"
                    color='primary'
                    onClick={() => handleEnter(group.id)}
                    sx={{width: '120px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Enter
                </Button>
            </Grid>
        </Grid>
    </Paper>
  );
};

export default GroupCard;
