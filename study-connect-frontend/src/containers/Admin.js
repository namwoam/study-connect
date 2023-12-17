import { React, useState, useEffect } from 'react';
import { Typography, Container, TextField, Autocomplete, Snackbar } from '@mui/material';
import instance from '../instance';
import ImportGroup from '../components/admin/ImportGroup';
import QueryDissolvedGroups from '../components/admin/RessolvedGroup';
import ProfessorStatsTable from '../components/admin/ProfessorStat';
import CustomQuery from '../components/admin/CustomQuery';
import StudentStatsTable from '../components/admin/StudentStats';

const adminOptions = [
    {id: 0, label:"查詢、復原已刪除課程小組", value: "queryDissolvedGroups"},
    {id: 1, label:"匯入課程小組", value: "importGroupCSV"},
    {id: 2, label:"學生統計資訊", value: "studentStats"},
    {id: 3, label:"課程統計資訊", value: "courseStats"},
    {id: 4, label:"教授統計資訊", value: "ProfessorStats"},
    {id: 5, label:"客製化 Query 執行", value: "CustomQuery"}
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
            {selectedFunction && selectedFunction.value === 'importGroupCSV' && <ImportGroup />}
            {selectedFunction && selectedFunction.value === 'studentStats' && <StudentStatsTable />}
            {selectedFunction && selectedFunction.value === 'courseStats' && <></>}
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

export default AdminPage;