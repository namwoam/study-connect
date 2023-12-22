import { React, useState } from 'react';
import { Box } from '@mui/material';
import { UserCard } from './UserCard';
import InformationModal from './InformationModal';


const CourseMemberView = ({courseMembers, sendFriendRequest}) => {
    const [openModel, setOpenModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpen = (user) => {
        console.log(user)
        setSelectedUser(user);
        setOpenModel(true);
    }

    return(
        <>
            <Box sx={{ maxHeight: '52vh', overflowY: 'auto'}}>
                {courseMembers.map((member, index) => (
                    <UserCard user={member} handleOpen={handleOpen} sendFriendRequest={sendFriendRequest} key={index} id={index}/>
                ))}
            </Box>
            {selectedUser && <InformationModal open={openModel} setOpen={setOpenModel} user={selectedUser}/>}
        </>
    );
}

export default CourseMemberView;