import React, { useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Box,
    TablePagination,
  } from '@mui/material';
import instance from '../../instance';
import Papa from 'papaparse';

const CourseStatsTable = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [analysisType, setAnalysisType] = useState('groupCnt');
    const [sortType, setSortType] = useState('desc');
    const [fetchLimit, setFetchLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchProfessorData = async () => {
        setLoading(true);
        try {
            const by_student = 
                ((analysisType === 'MemberCnt') || (analysisType === 'both_sort_by_member'))
                ? true
                : false;
            const by_group = 
                by_student === true
                ? false
                : true;

            const response = await instance.get('admin/course_count', {
                params: {
                    by_group: by_group,
                    by_student: by_student,
                    limit: fetchLimit,
                    sort: sortType
                },
            });

            if (response.data.success) {
                setData(response.data.data.courses);
            } else {
                setError('Failed to fetch data');
            }
        } catch (error) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
        };

    const handleSearch = () => {
        setPage(0);
        fetchProfessorData();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const generateCSVData = () => {
        // const csvHeader = ['順序', '課程編號', '課程名稱', analysisType !== 'memberCnt' ? '小組總數' :"", analysisType !== 'groupCnt' ? '修課人數' :""];
        // const csvData = [csvHeader, ...data.map((student, index) => [index + 1, student[0], student[1], analysisType !== 'memberCnt' ? student[2] : "", analysisType !== 'groupCnt' ? student[3] :""])];
        // return csvData;
        if(analysisType === 'groupCnt'){
            const csvHeader = ['順序', '課程編號', '課程名稱', '小組總數'];
            const csvBody = data.map((student, index) => [index + 1, student[0], student[1], student[2]]);
            const csvData = [csvHeader, ...csvBody];
            return csvData;
        }
        else if(analysisType === 'memberCnt'){
            const csvHeader = ['順序', '課程編號', '課程名稱', '修課人數'];
            const csvBody = data.map((student, index) => [index + 1, student[0], student[1], student[3]]);
            const csvData = [csvHeader, ...csvBody];
            return csvData;
        }
        else{
            const csvHeader = ['順序', '課程編號', '課程名稱', '小組總數', '修課人數'];
            const csvBody = data.map((student, index) => [index + 1, student[0], student[1], student[2], student[3]]);
            const csvData = [csvHeader, ...csvBody];
            return csvData;
        }
    };
      
    const handleExportCSV = () => {
        const csvData = generateCSVData();
        const csvContent = Papa.unparse(csvData);
      
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
      
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'table_data.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
      

    return (
        <>
            <Box sx={{ maxWidth: '800px', display: 'flex', marginBottom: 2 }}>
                <FormControl size="small" sx={{ marginRight: 1 }}>
                    <InputLabel id="analysis-type-label">Analysis Type</InputLabel>
                    <Select
                        labelId="analysis-type-label"
                        id="analysis-type"
                        value={analysisType}
                        label="Analysis Type"
                        onChange={(e) => setAnalysisType(e.target.value)}
                    >
                        <MenuItem value="groupCnt">小組總數</MenuItem>
                        <MenuItem value="memberCnt">修課人數</MenuItem>
                        <MenuItem value="both_sort_by_group">小組總數和修課人數（依照小組數量排序）</MenuItem>
                        <MenuItem value="both_sort_by_member">小組總數和修課人數（依照學生數量排序）</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    size="small"
                    label="Limit"
                    type="number"
                    value={fetchLimit}
                    onChange={(e) => setFetchLimit(e.target.value)}
                    sx={{ marginRight: 1, width: '100px' }}
                />
                 <FormControl size="small" sx={{ marginRight: 1 }}>
                    <InputLabel id="sort-type-label">Sort Type</InputLabel>
                    <Select
                        labelId="sort-type-label"
                        id="sort-type"
                        value={sortType}
                        label="Sort Type"
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <MenuItem value="desc">高到低</MenuItem>
                        <MenuItem value="asc">低到高</MenuItem>
                    </Select>
                </FormControl>
                <Button size="small" variant="contained" onClick={handleSearch} sx={{ color: "#fff", fontWeight: 600}}>
                    Search
                </Button>
                {data.length > 0 && (
                    <Button
                    size="small"
                    variant="contained"
                    color='secondary'
                    onClick={handleExportCSV}
                    sx={{ color: '#fff', fontWeight: 600, marginLeft: 1}}
                  >
                    Export CSV
                  </Button>
                )}
            </Box>
            {data.length > 0 && (
                <>
                    <TableContainer component={Paper} sx={{ width: '600px', marginTop: '10px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>順序</TableCell>
                                    <TableCell>課程ID</TableCell>
                                    <TableCell>課程名稱</TableCell>
                                    {(analysisType !== 'memberCnt') && <TableCell>小組總數</TableCell>}
                                    {(analysisType !== 'groupCnt') && <TableCell>修課人數</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : data
                                ).map((student, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{student[0]}</TableCell>
                                        <TableCell>{student[1]}</TableCell>
                                        {(analysisType !== 'memberCnt') && <TableCell>{student[2]}</TableCell>}
                                        {(analysisType !== 'groupCnt') && <TableCell>{student[3]}</TableCell>}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </>
    );
};

export default CourseStatsTable
