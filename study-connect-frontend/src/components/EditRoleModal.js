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

const EditRoleModal = ({open, setOpen, groupMember, groupID}) => {

    const handleClose = () => setOpen(false);

    // set the use state be the current leader
    const [editingLeader, setEditingLeader] = useState("");

    const handleLeaderChange = (event) => {
        setEditingLeader(event.target.value);
    };

    const handlePublish = () => {
        console.log('Publish an announcements');
        console.log(editingLeader);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModelStyle}>
                <Typography variant="h4" align="center" color="primary" sx={{mb: '20px'}}>
                    Edit Roles
                </Typography>
                {/* set a length = numOfMember scroll down menu to select who will be the group leader */}
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={editingLeader}
                    onChange={handleLeaderChange}
                    helperText="Please select who will be the group leader"
                >
                    {groupMember.map((member) => (
                        <MenuItem key={member.ID} value={member.Name}>
                            {member.Name}
                        </MenuItem>
                    ))}
                </TextField>
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
                    變更
                </Button>
            </Box>
        </Modal>
    );
}

export default EditRoleModal;