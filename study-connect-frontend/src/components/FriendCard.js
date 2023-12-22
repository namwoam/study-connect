import React from 'react';
import { Button, Grid, IconButton, Paper, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';

const FriendCardStyle = {
    padding: '15px', 
    width: '850px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'left',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column'
}

const FriendCard = ({friend, handleInfoOpen, handleUnfriend}) => {
    return (
        <Paper elevation={3} sx={FriendCardStyle}>
            <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{marginBottom: '10px'}}>
                <Grid item xs={4} md={4} sx={{display: 'flex'}}>
                    <Typography variant="h6">
                        {friend.username}
                    </Typography>
                    <IconButton
                        size='small'
                        color='gray'
                        sx={{marginLeft: 1}}
                        onClick={() => handleInfoOpen(friend)}
                    >
                        <InfoIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={1} md={2}>
                    <Paper elevation={0} style={{ borderRadius: '10px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '6px', paddingRight: '6px', marginRight: '10px', textAlign: 'center', background: '#ff0080' }}>
                        <Typography variant="subtitle2" fontWeight={600} color={'white'}>IG Account</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={2} md={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="body1" textAlign="center">{friend.ig_account}</Typography>
                </Grid>  
                <Grid item xs={2} md={2}>
                    <Paper elevation={0} style={{ borderRadius: '10px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '6px', paddingRight: '6px', marginRight: '10px', textAlign: 'center', background: '#0080ff' }}>
                        <Typography variant="subtitle2" fontWeight={600} color={'white'}>FB Account</Typography>
                    </Paper>
                </Grid>               
                <Grid item xs={2} md={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="body1" textAlign="center">{friend.fb_account}</Typography>
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="body1" color="textSecondary" paragraph>
                    {friend.selfIntro}
                </Typography>
                <Button
                    size='small'
                    variant="contained"
                    color='secondary'
                    onClick={() => handleUnfriend(friend.uid)}
                    sx={{ textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Delete Friend
                </Button>
            </Box>
        
            {/* <Grid container spacing={2} alignItems="center" justifyContent="center">
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
            </Grid> */}
        </Paper>
    )
}

export default FriendCard;