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

const EditJobModal = ({ open, setOpen, groupMember }) => {
  const handleClose = () => setOpen(false);

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
        <Typography variant="h6" color="primary" sx={{fontWeight: 700, mb: '20px'}}>
          編輯成員分工
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
            <Typography variant="body1" align="center" sx={{ width: '50%'}}>
              {member.name}
            </Typography>
            <TextField
              id={`outlined-basic-${index}`}
              size='small'
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
