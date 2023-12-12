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
};

const MeetingModal = ({open, setOpen}) => {
    const handleClose = () => setOpen(false);

    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDesciption] = useState("");

    const [selectedStartYear, setSelectedStartYear] = useState("");
    const [selectedStartMonth, setSelectedStartMonth] = useState("");
    const [selectedStartDay, setSelectedStartDay] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState("");

    const [selectedEndYear, setSelectedEndYear] = useState("");
    const [selectedEndMonth, setSelectedEndMonth] = useState("");
    const [selectedEndDay, setSelectedEndDay] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");

    const handleTitleChange = (event) => {
        setEditingTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setEditingDesciption(event.target.value);
    };

    const handleStartYearChange = (event) => {
        setSelectedStartYear(event.target.value);
    };

    const handleStartMonthChange = (event) => {
        setSelectedStartMonth(event.target.value);
    };

    const handleStartDayChange = (event) => {
        setSelectedStartDay(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setSelectedStartTime(event.target.value);
    };

    const handleEndYearChange = (event) => {
        setSelectedEndYear(event.target.value);
    };

    const handleEndMonthChange = (event) => {
        setSelectedEndMonth(event.target.value);
    };

    const handleEndDayChange = (event) => {
        setSelectedEndDay(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setSelectedEndTime(event.target.value);
    };



    const handlePublish = () => {
        console.log('Publish an announcements');
        console.log('Title:');
        console.log(editingTitle);
        console.log('Description:');
        console.log(editingDescription);
        console.log('Start Time:');
        console.log(selectedStartYear);
        console.log(selectedStartMonth);
        console.log(selectedStartDay);
        console.log(selectedStartTime);
        console.log('End Time:');
        console.log(selectedEndYear);
        console.log(selectedEndMonth);
        console.log(selectedEndDay);
        console.log(selectedEndTime);
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
                    label="會議名稱"
                    variant="outlined"
                    fullWidth
                    value={editingTitle}
                    onChange={handleTitleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    multiline
                    rows={4}
                    label="會議內容"
                    variant="outlined"
                    fullWidth
                    value={editingDescription}
                    onChange={handleDescriptionChange}
                    sx={{ mt: 2 }}
                />

                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <TextField
                        select
                        label="開始年分"
                        value={selectedStartYear}
                        onChange={handleStartYearChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 , marginRight: '8px'}}
                    >

                        {Array.from({ length: 10 }, (_, index) => (
                            <MenuItem key={index} value={2023 + index}>
                                {2023 + index}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* Select Month */}
                    <TextField
                        select
                        label="開始月分"
                        value={selectedStartMonth}
                        onChange={handleStartMonthChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 , marginRight: '8px'}}
                    >
                        {/* Generate month options (1 to 12) */}
                        {Array.from({ length: 12 }, (_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* Select Day */}
                    <TextField
                        select
                        label="開始日"
                        value={selectedStartDay}
                        onChange={handleStartDayChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 , marginRight: '8px'}}
                    >
                        {/* Generate day options (1 to 31) */}
                        {Array.from({ length: 31 }, (_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                    </TextField>
                        <TextField
                        select
                        label="開始時間"
                        value={selectedStartTime}
                        onChange={handleStartTimeChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 , marginRight: '8px'}}
                        >
                        {/* Generate time options (every 30 minutes) */}
                        {Array.from({ length: 48 }, (_, index) => (
                            <MenuItem key={index} value={index * 30}>
                                {`${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <TextField
                        select
                        label="結束年分"
                        value={selectedEndYear}
                        onChange={handleEndYearChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 , marginRight: '8px'}}
                    >
                        {/* Generate year options (adjust range as needed) */}
                        {Array.from({ length: 10 }, (_, index) => (
                            <MenuItem key={index} value={2023 + index}>
                                {2023 + index}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* Select Month */}
                    <TextField
                        select
                        label="結束月分"
                        value={selectedEndMonth}
                        onChange={handleEndMonthChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 , marginRight: '8px'}}
                    >
                        {/* Generate month options (1 to 12) */}
                        {Array.from({ length: 12 }, (_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* Select Day */}
                    <TextField
                        select
                        label="結束日"
                        value={selectedEndDay}
                        onChange={handleEndDayChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 , marginRight: '8px'}}
                    >
                        {/* Generate day options (1 to 31) */}
                        {Array.from({ length: 31 }, (_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                    </TextField>
                        <TextField
                        select
                        label="結束時間"
                        value={selectedEndTime}
                        onChange={handleEndTimeChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 , marginRight: '8px'}}
                        >
                        {/* Generate time options (every 30 minutes) */}
                        {Array.from({ length: 48 }, (_, index) => (
                            <MenuItem key={index} value={index * 30}>
                                {`${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                    <Button
                        id="confirm-update-button"
                        size="small"
                        variant="contained"
                        color="primary"
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
                        發起會議
                    </Button>
            </Box>
        </Modal>
    );
}

export default MeetingModal;