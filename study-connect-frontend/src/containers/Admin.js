import { React, useState, useEffect } from 'react';
import { Typography, Button, Container, MenuItem, Select, FormControl, InputLabel, TextField, Autocomplete, Snackbar } from '@mui/material';
import instance from '../instance';
import { fetchUserInfo } from '../utils/fetchUser';

const adminOptions = [
    {id: 0, label:"查詢、修改已刪除課程小組", value: "queryDissolvedGroups"},
    {id: 1, label:"查詢學生發起的課程小組數量", value: "studentGroupCount"},
    {id: 2, label:"查詢學生的好友數量", value: "studentFriendCount"},
    {id: 3, label:"課程統計資訊", value: "courseStats"},
    {id: 4, label:"最受歡迎的教授", value: "mostAttendedProfessor"},
]
const MainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const AdminPage = ({userID}) => {
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return(
        <Container sx={MainContainer}>
            <Typography variant="h5" fontWeight={800} sx={{mt: '30px'}}>
                Admin Page
            </Typography>
            <Autocomplete
                size='small'
                sx={{ width: '600px', marginTop: '25px', marginBottom: '30px' }}
                options={adminOptions}
                getOptionLabel={(option) => `${option.label}`}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label="選擇管理員功能" />}
                onChange={(event, newValue, reason) => {
                    setSelectedFunction(reason === "clear" || reason === "removeOption" ? null : newValue);
                }}
                value={selectedFunction}
            />
            {selectedFunction && selectedFunction.value === 'queryDissolvedGroups' && <QueryDissolvedGroups />}
            {selectedFunction && selectedFunction.value === 'studentGroupCount' && <StudentGroupCount />}
            {selectedFunction && selectedFunction.value === 'studentFriendCount' && <StudentFriendCount />}
            {selectedFunction && selectedFunction.value === 'courseStats' && <CourseStatistics />}
            {selectedFunction && selectedFunction.value === 'mostAttendedProfessor' && <MostAttendedProfessor />}
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={openSnackbar}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={handleCloseSnackbar}
                message={alertMessage}
            />
        </Container>
        
    );
}

// Additional components for each functionality
const QueryDissolvedGroups = () => {
    return <div>查詢、修改已刪除課程小組</div>;
};

const StudentGroupCount = () => {
    return <div>查詢學生發起的課程小組數量</div>;
};

const StudentFriendCount = () => {
    return <div>查詢學生的好友數量</div>;
};

const CourseStatistics = () => {
    return <div>Course Statistics Content</div>;
};

const MostAttendedProfessor = () => {
    return <div>Most Attended Professor Content</div>;
};

export default AdminPage;