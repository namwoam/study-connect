import { React, useState } from 'react';
import { Box } from '@mui/material';
import { UserCard } from './UserCard';
import InformationModal from './InformationModal';


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
                    <UserCard user={member} handleOpen={handleOpen} key={index} id={index}/>
                ))}
            </Box>
            <InformationModal open={openModel} setOpen={setOpenModel} userId={detailUserId}/>
        </>
    );
}

export default CourseMemberView;