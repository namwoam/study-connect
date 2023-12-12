import { React } from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';
import InvatationCard from './InvatationCard';

const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '70vh',
    overflowY: 'auto',
    mt: '20px'
};

const FriendModal = ({open, setOpen, invatations, accept_friend, reject_friend}) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModelStyle}>
                {invatations.map((invatation, index) => (
                    <InvatationCard invatation={invatation} accept_friend={accept_friend} reject_friend={reject_friend} />
                ))}
            </Box>
        </Modal>
    );
}

export default FriendModal;