import { React, useState, useEffect } from 'react';
import { Typography, Button, Container, MenuItem, Select, FormControl, InputLabel, TextField, Autocomplete, Snackbar } from '@mui/material';
import instance from '../instance';
import ProfessorStatsTable from '../components/admin/ProfessorStat';
import CustomQuery from '../components/admin/CustomQuery';

const adminOptions = [
    {id: 0, label:"查詢、修改已刪除課程小組", value: "queryDissolvedGroups"},
    {id: 1, label:"查詢學生發起的課程小組數量", value: "studentGroupCount"},
    {id: 2, label:"查詢學生的好友數量", value: "studentFriendCount"},
    {id: 3, label:"課程統計資訊", value: "courseStats"},
    {id: 4, label:"教授統計資訊", value: "ProfessorStats"},
    {id: 5, label:"客製化 Query 執行", value: "CustomQuery"},
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
            {

            }
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
            {selectedFunction && selectedFunction.value === 'ProfessorStats' && <ProfessorStatsTable />}
            {selectedFunction && selectedFunction.value === 'CustomQuery' && <CustomQuery />}
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
    return <div>課程統計資訊</div>;
};

export default AdminPage;