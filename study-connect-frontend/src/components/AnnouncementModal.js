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
};

const AnnouncementModal = ({open, setOpen}) => {
    const handleClose = () => setOpen(false);

    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDesciption] = useState("");

    const handleTitleChange = (event) => {
        setEditingTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setEditingDesciption(event.target.value);
    };

    const handlePublish = () => {
        console.log('Publish an announcements:\n Title:');
        console.log(editingTitle);
        console.log('Description:');
        console.log(editingDescription);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModelStyle}>
                <TextField
                    multiline
                    rows={1}
                    label="公告標題"
                    variant="outlined"
                    fullWidth
                    value={editingTitle}
                    onChange={handleTitleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    multiline
                    rows={4}
                    label="公告內容"
                    variant="outlined"
                    fullWidth
                    value={editingDescription}
                    onChange={handleDescriptionChange}
                    sx={{ mt: 2 }}
                />
                    <Button
                        id="confirm-update-button"
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={handlePublish}
                        sx={{
                            width: '100px',
                            height: '50px',
                            borderRadius: '30px',
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