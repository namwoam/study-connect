import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';

const GroupCard = ({ group, id }) => {
    const handleEnter = (id) => {
        console.log(id);
    }
  return (
    <Paper elevation={3} style={{ padding: 20, margin: 10, height: '12%' }}>
        <Grid container spacing={3}>
            {/* Group Name, Semester, Course Name */}
            <Grid item md={3}>
                <Typography variant="h5" gutterBottom>
                    {group.groupName}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" style={{ padding: 10, textAlign: 'center', height: '100%' }}>
                            {group.semester}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" style={{ padding: 10, textAlign: 'center', height: '100%' }}>
                            {group.courseName}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            {/* Jobs */}
            <Grid item md={7} container spacing={2}>
            {group.jobs.map((job, index) => (
                <Grid item key={index} xs={4}>
                <Paper elevation={2} style={{ padding: 10, textAlign: 'center', background: '#d0d0d0' }}>
                    <Typography variant="subtitle2">{job}</Typography>
                </Paper>
                </Grid>
            ))}
            </Grid>

            {/* Enter Button */}
            <Grid item md={2} container style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    size='small'
                    maxHeight='10px'
                    variant="contained"
                    color='primary'
                    onClick={() => handleEnter(group.id)}
                    sx={{width: '120px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Enter
                </Button>
            </Grid>
        </Grid>
    </Paper>
  );
};

export default GroupCard;
