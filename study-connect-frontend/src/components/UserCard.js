import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';

const UserCardStyle = {
    padding: '15px', 
    width: '800px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

export const UserCard = (props) => {
    const user = props.user;
    const handleOpen = props.handleOpen;

    return (
        <Grid container spacing={2} sx={UserCardStyle}>
            <Grid md={8}>
                <Typography>
                    {user.username}
                </Typography>
                <Typography>
                    {user.selfIntro}
                </Typography>
            </Grid>
            <Grid md={4} 
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end' 
                }}
            >
                <Button
                    size='small'
                    variant="contained"
                    color='primary'
                    sx={{width: '120px', mb: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Send Request
                </Button>
                <Button
                    size='small'
                    variant="contained"
                    color='secondary'
                    onClick={() => handleOpen(user.uid)}
                    sx={{width: '120px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Show More
                </Button>
            </Grid>
        </Grid>
    )
}