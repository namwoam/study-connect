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

const EditRoleModal = ({open, setOpen, groupMember, groupID}) => {

    const handleClose = () => setOpen(false);

    // set the use state be the current leader
    const [editingLeader, setEditingLeader] = useState("");

    const handleLeaderChange = (event) => {
        setEditingLeader(event.target.value);
    };

    const handlePublish = () => {
        console.log('變更組長');
        console.log(editingLeader);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModelStyle}>
                <Typography variant="h6" color="primary" sx={{fontWeight: 700, mb: '20px'}}>
                    變更組長
                </Typography>
                {/* set a length = numOfMember scroll down menu to select who will be the group leader */}
                <TextField
                    id="outlined-select-currency"
                    size='small'
                    select
                    label="Select"
                    value={editingLeader}
                    onChange={handleLeaderChange}
                    helperText="Please select who will be the group leader"
                    sx={{width: '90%'}}
                >
                    {groupMember.map((member) => (
                        <MenuItem key={member.student_id} value={member.name}>
                            {member.name}
                        </MenuItem>
                    ))}
                </TextField>
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
                    確認變更
                </Button>
            </Box>
        </Modal>
    );
}

export default EditRoleModal;