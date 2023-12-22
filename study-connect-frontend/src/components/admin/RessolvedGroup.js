import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Box,
  TextField,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Autocomplete
} from '@mui/material';
import instance from '../../instance';

const QueryDissolvedGroups = () => {
    const [groups, setGroups] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [fetchLimit, setFetchLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [queryGroupsType, setQueryGroupsType] = useState('delete');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchGroups = async () => {
        try {
            const endpoint = queryGroupsType === 'delete' ? '/admin/group/list_deleted' : selectedCourseId == null ? '/admin/list_groups' : `/admin/list_groups?course_id=${selectedCourseId.id}`;
            const response = await instance.get(endpoint, {
                params: {
                    limit: fetchLimit,
                },
            });
            
            if (response.status === 200) {
                const fetchedGroup = response.data.data.groups;
                setGroups(fetchedGroup);
                if (fetchedGroup.length === 0){
                    setAlertMessage('目前無資料');
                    setOpenSnackbar(true);
                }
            } else {
                console.error('Failed to fetch groups');
            }
        } catch (error) {
            console.error('Error fetching groups', error);
        }
    };

    const handleGroupIdChange = (event) => {
        setSelectedGroupId(event.target.value);
    };

    const handleRestoreGroup = async () => {
        try {
            const response = await instance.post('/admin/group/restore_group', {
                group_id: selectedGroupId,
            });

            if (response.status === 200) {
                setAlertMessage(`Group ${selectedGroupId} restored successfully`);
                setOpenSnackbar(true);
            } else {
                setAlertMessage('Failed to restore group');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setAlertMessage('Error restoring group', error);
            setOpenSnackbar(true);
        }
    };

    const handleDeleteGroup = async () => {
        try {
            const response = await instance.post('/admin/group/delete_group', {
                group_id: selectedGroupId,
            });

            if (response.status === 200) {
                setAlertMessage(`Group ${selectedGroupId} deleted successfully`);
                setOpenSnackbar(true);
            } else {
                setAlertMessage('Failed to delete group');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setAlertMessage('Error deleting group', error);
            setOpenSnackbar(true);
        }
    };

    const handleSearch = () => {
        setPage(0);
        fetchGroups();
    };

    const fetchCourseOptions = async () => {
        try {
          const response = await instance.get('/admin/list_courses?limit=9999');
          if (response.status === 200) {
            let courses = [];
            let enrolledCourses = response.data.data.courses;
            console.log(enrolledCourses)
            enrolledCourses.forEach((course) => {
                courses.push({id: course[0], label: course[1]})
            })
            setCourseOptions([...courses]);
          } else {
            console.error('Failed to fetch course options');
          }
        } catch (error) {
          console.error('Error fetching course options', error);
        }
    };
    
    useEffect(() => {
        fetchCourseOptions();
    }, []);

    return (
        <>
            <Box sx={{ maxWidth: '1000px', display: 'flex', marginBottom: 2 }}>
                <FormControl size="small" sx={{ minWidth: '150px', marginRight: 1 }}>
                    <InputLabel id="group-type-label">查詢小組之狀態</InputLabel>
                    <Select
                        labelId="group-type-label"
                        id="group-type"
                        value={queryGroupsType}
                        label="Group Type"
                        onChange={(e) => setQueryGroupsType(e.target.value)}
                    >
                        <MenuItem value="delete">已刪除小組</MenuItem>
                        <MenuItem value="active">所有未刪除小組</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    size="small"
                    label="Limit"
                    type="number"
                    value={fetchLimit}
                    onChange={(e) => setFetchLimit(e.target.value)}
                    sx={{ minWidth: '80px' }}
                />
                {queryGroupsType === 'active' && (
                    <Autocomplete
                        size='small'
                        fullWidth
                        sx={{marginLeft: 1}}
                        options={courseOptions}
                        getOptionLabel={(option) => `${option.id}`+ ' ' + `${option.label}`}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField {...params} label="選擇課程" />}
                        onChange={(event, newValue, reason) => {
                            setSelectedCourseId(reason === "clear" || reason === "removeOption" ? null : newValue);
                        }}
                        value={selectedCourseId}
                    />
                )}
                <Button size="small" variant="contained" onClick={handleSearch} sx={{ color: "#fff", fontWeight: 600, marginLeft: 2}}>
                    Search
                </Button>
            </Box>
            
            {groups.length > 0 && <>
            <TableContainer component={Paper} sx={{ width: '600px', marginTop: '10px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>小組 ID</TableCell>
                        <TableCell>小組名稱</TableCell>
                        <TableCell>組長學號</TableCell>
                        <TableCell>課號</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                {(rowsPerPage > 0
                    ? groups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : groups
                ).map((group, index) => (
                    <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{group[0]}</TableCell>
                        <TableCell>{group[1]}</TableCell>
                        <TableCell>{group[2]}</TableCell>
                        <TableCell>{group[3]}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                component="div"
                count={groups.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Box sx={{ maxWidth: '600px', display: 'flex', my: '20px' }}>
                <TextField
                    id="operate-group-id"
                    size="small"
                    label={queryGroupsType === 'delete' ? "輸入復原小組 ID" : "輸入刪除小組 ID"}
                    variant="outlined"
                    value={selectedGroupId}
                    onChange={handleGroupIdChange}
                    sx={{ marginRight: 2, width: '180px' }}
                />
                <Button size="small" variant="contained" color="primary" onClick={queryGroupsType === 'delete' ? handleRestoreGroup : handleDeleteGroup} sx={{ color: "#fff", fontWeight: 600, marginRight: 1 }}>
                {queryGroupsType === 'delete' ? "復原" : "刪除"}
                </Button>
            </Box>
            </>}
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
        </>
    );
};

export default QueryDissolvedGroups;
