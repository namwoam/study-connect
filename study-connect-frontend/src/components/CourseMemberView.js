import { React, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import InformationModal from './InformationModal';

const UserCardStyle = {
    padding: '15px', 
    width: '800px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

const CourseMemberView = ({selectedMember, courseMembers}) => {
    const [openModel, setOpenModel] = useState(false);
    const [detailUserId, setDetailUserId] = useState("");

    const handleOpen = (userId) => {
        setDetailUserId(userId);
        setOpenModel(true);
    }

    return(
        <>
            <Box sx={{ maxHeight: '65vh', overflowY: 'auto'}}>
                {selectedMember && courseMembers.map((member, index) => (
                     <Grid container spacing={2} sx={UserCardStyle}>
                        <Grid md={8}>
                            <Typography>
                                {member.username}
                            </Typography>
                            <Typography>
                                {member.selfIntro}
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
                                color='secondary'
                                onClick={() => handleOpen(member.uid)}
                                sx={{width: '120px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                            >
                                Show More
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Box>
            <InformationModal open={openModel} setOpen={setOpenModel} userId={detailUserId}/>
        </>
    );
}

export default CourseMemberView;