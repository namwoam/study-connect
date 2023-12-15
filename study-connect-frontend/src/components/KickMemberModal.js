import { React, useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button,
    Container,
    Modal,
    TextField,
    Paper,
    MenuItem
  } from '@mui/material';

const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '70vh',
    overflowY: 'auto',
    mt: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    borderRadius: '10px',
};

const KickMemberModal = ({open, setOpen, member}) => {
    const handleClose = () => setOpen(false);

    const handlePublish = () => {
        console.log(`剔除${member.name}`);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            {member && 
            <Box sx={ModelStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    確認移除 {member.name} ？
                </Typography>
                
                <Box sx={{display: 'flex'}}>
                    <Button
                        id="confirm-update-button"
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={handleClose}
                        sx={{
                            width: '80px',
                            mt: '25px',
                            mr: '10px',
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        id="confirm-update-button"
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handlePublish}
                        sx={{
                            width: '80px',
                            mt: '25px',
                            textTransform: 'none',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        確認
                    </Button>
                </Box>
            </Box>
            }
        </Modal>
    );
}

export default KickMemberModal;