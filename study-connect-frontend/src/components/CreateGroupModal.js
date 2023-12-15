import { React, useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button,
    Container,
    Modal,
    TextField,
    MenuItem
  } from '@mui/material';

const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
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

// 應該要用userID去取user這學期有修的課程 開一個下拉式選單讓他選
// 除了那個 其他地方應該都是完成的了


const CreateGroupModal = ({open, setOpen, courseOptions, handlePublish}) => {
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

    const handleSubmit = () => {
        handlePublish(editingGroupName, editingMaximumMember, editingCourseID);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModelStyle}>
                <Typography variant="h6" color="primary" sx={{fontWeight: 700, mb: '20px'}}>
                    創立課程小組
                </Typography>

                <TextField
                    id="outlined-select-currency"
                    size='small'
                    select
                    label="請選擇課程"
                    value={editingCourseID}
                    onChange={handleCourseIDChange}
                    sx={{width: '90%'}}
                >
                    {courseOptions.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                            {course.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    size='small'
                    label="小組名稱"
                    variant="outlined"
                    value={editingGroupName}
                    onChange={handleGroupNameCHange}
                    sx={{width: '90%', my: '20px'}}
                />
                <TextField
                    select
                    size='small'
                    label="成員上限"
                    value={editingMaximumMember}
                    onChange={handleMaximumMemberChange}
                    helperText="Please select maximum number of member"
                    sx={{width: '90%'}}
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
                        onClick={handleSubmit}
                        sx={{
                            width: '100px',
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