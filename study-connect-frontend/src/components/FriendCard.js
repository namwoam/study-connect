import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const FriendCardStyle = {
    padding: '15px', 
    width: '800px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

const FriendCard = ({friend}) => {
    return (
        <Paper elevation={3} sx={FriendCardStyle}>
            <Typography variant="h5" gutterBottom>
                {friend.username}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                {friend.selfIntro}
            </Typography>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={2}>
                    <Paper elevation={0} style={{ borderRadius: '10px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '6px', paddingRight: '6px', marginRight: '10px', textAlign: 'center', background: '#ff0080' }}>
                        <Typography variant="subtitle2" fontWeight={600} color={'white'}>IG Account</Typography>
                    </Paper>
                    <Paper elevation={0} style={{ borderRadius: '10px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '6px', paddingRight: '6px', marginRight: '10px', textAlign: 'center', background: '#0080ff' }}>
                        <Typography variant="subtitle2" fontWeight={600} color={'white'}>FB Account</Typography>
                    </Paper>
                </Grid>                        
                <Grid item xs={8} style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="body1" textAlign="center">{friend.ig_account}</Typography>
                    <Typography variant="body1" textAlign="center">{friend.fb_account}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default FriendCard;