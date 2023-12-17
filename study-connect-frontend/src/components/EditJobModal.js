import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const ModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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

const EditJobModal = ({ open, setOpen, groupMember, groupID }) => {
  const handleClose = () => setOpen(false);

  const initialEditingJobs = groupMember.reduce((acc, member) => {
    acc[member.student_id] = member.job || '';
    return acc;
  }, {});

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [editingJobs, setEditingJobs] = useState(initialEditingJobs);

  const handleMemberClick = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handlePublish = () => {
    console.log(editingJobs);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={ModelStyle}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mb: '20px' }}>
          編輯成員分工
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          {/* Left side: List of members */}
          <List sx={{ width: '50%', borderRight: 1, borderColor: 'divider' }}>
            {groupMember.map((member) => (
              <ListItem
                key={member.student_id}
                button
                selected={selectedMembers.includes(member.student_id)}
                onClick={() => handleMemberClick(member.student_id)}
              >
                <ListItemText primary={member.name} />
              </ListItem>
            ))}
          </List>

          {/* Right side: Job editing fields */}
          <Box sx={{ width: '50%', paddingLeft: '10px' }}>
            {selectedMembers.map((memberId) => (
              <Box
                key={memberId}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{ mb: '20px' }}
              >
                <Typography variant="body1" align="center" sx={{ width: '50%' }}>
                  {groupMember.find((member) => member.student_id === memberId)?.name || ''}
                </Typography>
                <TextField
                  id={`outlined-basic-${memberId}`}
                  size="small"
                  label="Job"
                  variant="outlined"
                  value={editingJobs[memberId] || ''}
                  onChange={(e) => setEditingJobs({ ...editingJobs, [memberId]: e.target.value })}
                  sx={{ width: '50%', paddingRight: '10px' }}
                />
              </Box>
            ))}
          </Box>
        </Box>

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
          確認編輯
        </Button>
      </Box>
    </Modal>
  );
};

export default EditJobModal;
