import React, { useState, useEffect } from 'react';
import {
    Autocomplete,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Snackbar
} from '@mui/material';
import instance from '../../instance';

const ImportGroup = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [courseOptions, setCourseOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [editingGroupName, setEditingGroupName] = useState("");
    const [editingMaximumMember, setEditingMaximumMember] = useState(2);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedLeader, setSelectedLeader] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
    
        if (file) {
            try {
                const content = await readFileContent(file);
                setCsvFile(content);
            } catch (error) {
                console.error('Error reading CSV file', error);
            }
        }
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                const content = event.target.result;
                resolve(content);
            };
    
            reader.onerror = (error) => {
                reject(error);
            };
    
            reader.readAsText(file, 'utf-8');
        });
    };

    const handleUpload = async () => {
        if (csvFile) {
            try {
                const group = { 
                    "user": selectedLeader.id,
                    "group_name": editingGroupName,
                    "capacity": editingMaximumMember,
                    "course_id": selectedCourseId.id
                };
                console.log(
                    {
                        csv: csvFile,
                        group_data: group
                    }
                );
                const response = await instance.post('admin/group/create_csv', {
                    csv: csvFile,
                    group_data: group
                });
                if (response.status == 200) {
                    setAlertMessage("Import group successfully")
                    setOpenSnackbar(true);
                } else {
                    setAlertMessage("Fail to import group")
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setAlertMessage('Error when uploading CSV file', error);
                setOpenSnackbar(true);
            }
        } else {
            setAlertMessage('No CSV file selected for upload');
            setOpenSnackbar(true);
        }
    };

  const fetchCourseOptions = async () => {
    try {
        const response = await instance.get('/admin/list_courses?limit=9999');
        if (response.status === 200) {
            let courses = [];
            let enrolledCourses = response.data.data.courses;
            enrolledCourses.forEach((course) => {
                courses.push({ id: course[0], label: course[1] });
            });
            setCourseOptions([...courses]);
        } else {
            console.error('Failed to fetch course options');
        }
    } catch (error) {
        console.error('Error fetching course options', error);
    }
  };

    const fetchStudentOptions = async (courseId) => {
        try {
            const response = await instance.get(`/course/list_students/${courseId}`);
            if (response.status === 200) {
                setStudentOptions(response.data.data.students.map((student) => ({ id: student, label: student })));
            } else {
                console.error('Failed to fetch student options');
            }
        } catch (error) {
            console.error('Error fetching student options', error);
        }
    };

    useEffect(() => {
        fetchCourseOptions();
    }, []);

    useEffect(() => {
        if (selectedCourseId) {
        fetchStudentOptions(selectedCourseId.id);
        }
    }, [selectedCourseId]);

    return (
        <>
            <Box sx={{ minWidth: '550px', display: 'flex', marginBottom: 2}}>
                <Autocomplete
                    sx={{ width: '100%', marginRight: 1 }}
                    size='small'
                    options={courseOptions}
                    getOptionLabel={(option) => `${option.id}` + ' ' + `${option.label}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="選擇課程" />}
                    onChange={(event, newValue, reason) => {
                        setSelectedCourseId(reason === 'clear' || reason === 'removeOption' ? null : newValue);
                    }}
                    value={selectedCourseId}
                />
                <Autocomplete
                    sx={{ width: '100%'}}
                    size='small'
                    options={studentOptions}
                    getOptionLabel={(option) => `${option.label}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="選擇組長" />}
                    onChange={(event, newValue, reason) => {
                        setSelectedLeader(reason === 'clear' || reason === 'removeOption' ? null : newValue);
                    }}
                    value={selectedLeader}
                />
            </Box>
            <Box sx={{ minWidth: '550px', display: 'flex', marginBottom: 2}}>
                <TextField
                    size='small'
                    label="小組名稱"
                    variant="outlined"
                    value={editingGroupName}
                    onChange={(e) => setEditingGroupName(e.target.value)}
                    sx={{ width: '100%', marginRight: 2 }}
                />
                <FormControl sx={{ width: '100%' }}>
                <InputLabel id="select-max-member-label">成員上限</InputLabel>
                <Select
                    size='small'
                    labelId="select-max-member-label"
                    id="select-max-member"
                    value={editingMaximumMember}
                    onChange={(e) => setEditingMaximumMember(e.target.value)}
                >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                    <MenuItem key={number} value={number}>
                        {number}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>
            <Typography>範例 CSV 格式</Typography>
            <Box sx={{ my: 2 }}>
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>user_id</TableCell>
                        <TableCell>role</TableCell>
                        <TableCell>job</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Leader</TableCell>
                        <TableCell>Some Job</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Member</TableCell>
                        <TableCell>Another Job</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
            <Box sx={{ mb: 1, display: 'flex' }}>
                <FormControl sx={{ marginRight: 2 }}>
                    <input
                        accept=".csv"
                        id="csv-file-input"
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="csv-file-input">
                        <Button variant="contained" color="secondary" component="span" sx={{ color: '#fff', fontWeight: 600 }}>
                        選擇 CSV 檔案
                        </Button>
                    </label>
                </FormControl>
                {csvFile && (
                    <Typography sx={{ paddingTop: '5px', marginRight: 1}}>{csvFile.name}</Typography>
                )}
                {csvFile && (
                    <Button
                        size='small'
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        sx={{ color: '#fff', fontWeight: 600 }}
                    >
                        確認上傳
                    </Button>
                )}
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
            </Box>
        </>
    );
};

export default ImportGroup;
