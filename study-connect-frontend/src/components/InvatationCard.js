import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

const InvatationStyle = {
    padding: '15px', 
    width: '800px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

export const InvatationCard = (invatation, accept, reject) => {
    
    //{uid: 1, username: 'user1', selfIntro: 'Hi, my name is ...', status: 'Unconfirmed'},

    return (
        <Grid container spacing={2} sx={InvatationStyle}>
            <Grid md={8}>
                <Typography>
                    {invatation.username}
                </Typography>
                <Typography>
                    {invatation.selfIntro}
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
                    onClick={() => accept(invatation.uid)}
                    sx={{width: '120px', mb: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Accept
                </Button>
                <Button
                    size='small'
                    variant="contained"
                    color='secondary'
                    onClick={() => reject(invatation.uid)}
                    sx={{width: '120px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                >
                    Reject
                </Button>
            </Grid>
        </Grid>
    )
}

export default InvatationCard;