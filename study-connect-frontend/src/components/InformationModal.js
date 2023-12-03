import { React } from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

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

const InformationModal = ({open, setOpen, userId}) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={ModelStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Detail of userID = {userId}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    );
}

export default InformationModal;