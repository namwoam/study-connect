import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

const InformationModal = ({ open, setOpen, user }) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={ModalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    使用者詳細資訊
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    <p>學號: {user.student_id}</p>
                    <p>系所: {user.department}</p>
                    <p>修課檢視: {user.self_introduction}</p>
                    
                    {/* <p>Instagram 帳號: {user.ig_account}</p>
                    <p>Facebook 帳號: {user.fb_account}</p> */}
                </Typography>
            </Box>
        </Modal>
    );
}

export default InformationModal;
