import { React } from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';
import InvatationCard from './InvatationCard';

const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
    maxHeight: '70vh',
    overflowY: 'auto',
};

const FriendModal = ({open, setOpen, invatations, accept_friend, reject_friend, handleInfoOpen}) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModelStyle}>
            {
                invatations.length > 0 ? invatations.map((invatation, index) => (
                    <InvatationCard invatation={invatation} accept_friend={accept_friend} reject_friend={reject_friend} handleInfoOpen={handleInfoOpen}/>
                ))
                :
                <Typography>You don't have any friend requests now. QQ</Typography>
            }
            </Box>
        </Modal>
    );
}

export default FriendModal;