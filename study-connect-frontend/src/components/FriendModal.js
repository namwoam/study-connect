import { React } from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';
import InvatationCard from './InvatationCard';

const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const FriendModal = ({open, setOpen, invatations, accept_friend, reject_friend}) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            {invatations.map((invatation, index) => (
                <InvatationCard invatation={invatation} accept={accept_friend} reject={reject_friend} />
            ))}
        </Modal>
    );
}

export default FriendModal;