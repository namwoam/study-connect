import { React } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';


const GroupCard = {
    padding: '15px', 
    width: '600px', 
    margin: '20px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
    alignItems: 'center',
    borderRadius: '10px'
}

const CourseGroupView = ({selectedCourse, courseGroups, sendJoinGroupRequest}) => {
    
    return(
        <Box sx={{ maxHeight: '65vh', overflowY: 'auto'}}>
            {selectedCourse && courseGroups.map((group) => (
                <Grid container spacing={2} sx={GroupCard} key={group.id}>
                    <Grid md={8}>
                        <Typography>
                            小組名稱：{group.groupName}
                        </Typography>
                        <Typography variant="subtitle2" color="gray">
                            小組人數：{group.currentCnt}/{group.groupCapacity}
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
                        {
                            group.currentCnt >= group.groupCapacity ?
                            <Button
                                size='small'
                                variant="contained"
                                disabled
                                sx={{width: '160px', mb: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                            >
                                Course Group Full!
                            </Button> 
                            :
                            <Button
                                size='small'
                                variant="contained"
                                color='primary'
                                sx={{width: '160px', mb: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                                onClick={() => sendJoinGroupRequest(group.id)}
                            >
                                Join Course Group!
                            </Button>
                        }
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
}

export default CourseGroupView;