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

// 應該要用userID去取user這學期有修的課程 開一個下拉式選單讓他選
// 除了那個 其他地方應該都是完成的了


const CreateGroupModal = ({open, setOpen, userID}) => {
    const handleClose = () => setOpen(false);

    const [editingGroupName, setEditingGroupName] = useState("");
    const [editingMaximumMember, setEditingMaximumMember] = useState(2);
    const [editingCourseID, setEditingCourseID] = useState("");

    const handleGroupNameCHange = (event) => {
        setEditingGroupName(event.target.value);
    };

    const handleMaximumMemberChange = (event) => {
        setEditingMaximumMember(event.target.value);
    };

    const handleCourseIDChange = (event) => {
        setEditingCourseID(event.target.value);
    }

    const handlePublish = () => {
        console.log('Publish');
        try {
            const response = instance.post('/group/create', {
                user: userID,
                group_name: editingGroupName,
                Capacity: editingMaximumMember,
                course_id: editingCourseID,
            });
            if (response.data.success) {
                setAlertMessage('Request sent successfully');
            } else {
                setAlertMessage('Failed to send request');
            }
        } catch (error) {
            console.log(error);
        }
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModelStyle}>
                <Typography variant="h4" align="center" color="primary" sx={{mb: '20px'}}>
                    Create group
                </Typography>
                <TextField
                    multiline
                    rows={1}
                    label="小組名稱"
                    variant="outlined"
                    fullWidth
                    value={editingGroupName}
                    onChange={handleGroupNameCHange}
                    sx={{ mt: 2 }}
                />

                <TextField
                    select
                    label="成員上限"
                    value={editingMaximumMember}
                    onChange={handleMaximumMemberChange}
                    helperText="Please select maximum number of member"
                >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                        <MenuItem key={number} value={number}>
                            {number}
                        </MenuItem>
                    ))}
                </TextField>
                    <Button
                        id="confirm-create-group-button"
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
                        創立小組
                    </Button>
            </Box>
        </Modal>
    );
}

export default CreateGroupModal;