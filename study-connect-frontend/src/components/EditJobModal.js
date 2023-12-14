import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Modal,
  TextField,
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

const EditJobModal = ({ open, setOpen, groupMember }) => {
  const handleClose = () => setOpen(false);

  // 初始化状态时遍历组成员，将每个成员的默认工作添加到状态中
  const initialEditingJobs = groupMember.map((member) => member.job || ''); // Use member.job or an empty string if job is undefined
  const [editingJobs, setEditingJobs] = useState(initialEditingJobs);

  const handleEditingJobs = (event, memberId) => {
    const updatedJobs = [...editingJobs];
    updatedJobs[memberId] = event.target.value;
    setEditingJobs(updatedJobs);
  };

  const handlePublish = () => {
    console.log('Publish an announcement');
    console.log(editingJobs);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={ModelStyle}>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: '20px' }}>
          Edit Job
        </Typography>

        {groupMember.map((member, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            sx={{ mb: '20px' }}
          >
            <Typography variant="h6" align="center" color="primary" sx={{ width: '50%', paddingLeft: '10px' }}>
              {member.name}
            </Typography>
            <TextField
              id={`outlined-basic-${index}`}
              label="Job"
              variant="outlined"
              value={editingJobs[index] || ''}
              onChange={(e) => handleEditingJobs(e, index)}
              sx={{ width: '50%', paddingRight: '10px' }}
            />
          </Box>
        ))}
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
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default EditJobModal;
