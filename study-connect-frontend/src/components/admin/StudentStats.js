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

const StudentStatsTable = () => {
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
            const endpoint =
            analysisType === 'groupCnt'
                ? '/admin/group_creator'
                : '/admin/friend_count';

            const response = await instance.get(endpoint, {
                params: {
                    limit: fetchLimit,
                    sort: sortType
                },
            });

            if (response.data.success) {
                setData(response.data.data.students);
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
        const csvHeader = ['順序', '學號', '姓名', analysisType === 'groupCnt' ? '創建小組數' : '好友總數'];
        const csvData = [csvHeader, ...data.map((student, index) => [index + 1, student[0], student[1], student[2]])];
        return csvData;
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
                        <MenuItem value="groupCnt">創建小組數</MenuItem>
                        <MenuItem value="hardworking">好友總數</MenuItem>
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
                                    <TableCell>學號</TableCell>
                                    <TableCell>姓名</TableCell>
                                    <TableCell>{analysisType === 'groupCnt' ? "總召的料（創建小組數）" : "好友總數"}</TableCell>
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
                                        <TableCell>{student[2]}</TableCell>
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

export default StudentStatsTable
