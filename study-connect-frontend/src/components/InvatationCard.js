import React from 'react';
import { Grid, Typography, Button, IconButton, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';

const InvatationStyle = {
    padding: '15px', 
    maxWidth: '550px', 
    margin: '10px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px',
    justifyContent: 'center'
}

export const InvatationCard = ({invatation, accept_friend, reject_friend, handleInfoOpen}) => {
    
    return (
        <Grid key={invatation.uid} container spacing={2} sx={InvatationStyle}>
            <Grid item md={8} 
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start' 
                }}
            >
                <Box sx={{display: 'flex'}}>
                    <Typography variant="h6">
                        {invatation.username}
                    </Typography>
                    <IconButton
                        size='small'
                        color='gray'
                        sx={{marginLeft: 1}}
                        onClick={() => handleInfoOpen(invatation)}
                    >
                        <InfoIcon />
                    </IconButton>
                </Box>
                <Typography variant="body1" color="textSecondary" paragraph>
                    {invatation.selfIntro}
                </Typography>
            </Grid>
            <Grid item md={4} 
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
                    onClick={() => accept_friend(invatation.uid)}
                    sx={{width: '120px', mb: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Accept
                </Button>
                <Button
                    size='small'
                    variant="contained"
                    color='secondary'
                    onClick={() => reject_friend(invatation.uid)}
                    sx={{width: '120px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Reject
                </Button>
            </Grid>
        </Grid>
    )
}

export default InvatationCard;