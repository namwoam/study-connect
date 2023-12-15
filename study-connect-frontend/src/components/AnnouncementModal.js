import { React, useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button,
    Container,
    Modal,
    TextField,
    Paper
  } from '@mui/material';

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
    mt: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    borderRadius: '30px',
};

const AnnouncementModal = ({open, setOpen, handlePublishAnnouncement}) => {
    const handleClose = () => setOpen(false);

    const [editingDescription, setEditingDesciption] = useState("");

    const handleDescriptionChange = (event) => {
        setEditingDesciption(event.target.value);
    };

    const handlePublish = () => {
        handlePublishAnnouncement(editingDescription);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModelStyle}>
                <Typography variant="h6" color="primary" sx={{fontWeight: 700, mb: '20px'}}>
                    發起會議
                </Typography>
                <TextField
                    multiline
                    rows={2}
                    label="公告內容"
                    variant="outlined"
                    fullWidth
                    value={editingDescription}
                    onChange={handleDescriptionChange}
                />
                    <Button
                        id="confirm-update-button"
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handlePublish}
                        sx={{
                            width: '100px',
                            mt: '25px',
                            textTransform: 'none',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        發起公告
                    </Button>
            </Box>
        </Modal>
    );
}

export default AnnouncementModal;