import React, { useState, useEffect } from 'react';
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

const ProfessorStatsTable = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [analysisType, setAnalysisType] = useState('popular'); // Default to popular
    const [fetchLimit, setFetchLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchProfessorData = async () => {
        setLoading(true);
        try {
            const endpoint =
            analysisType === 'popular'
                ? '/admin/popular_instructor'
                : '/admin/hardwork_instructor';

            const response = await instance.get(endpoint, {
                params: {
                    limit: fetchLimit,
                },
            });

            if (response.data.success) {
                setData(response.data.data.instructors);
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
        const csvHeader = ['順序', '教授名稱', analysisType === 'popular' ? '總修課學生數' : '總授課數'];
        const csvData = [csvHeader, ...data.map((professor, index) => [index + 1, professor[1], professor[2]])];
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
            <Box sx={{ maxWidth: '600px', display: 'flex', marginBottom: 2 }}>
                <FormControl size="small" sx={{ marginRight: 2 }}>
                    <InputLabel id="analysis-type-label">Analysis Type</InputLabel>
                    <Select
                        labelId="analysis-type-label"
                        id="analysis-type"
                        value={analysisType}
                        label="Analysis Type"
                        onChange={(e) => setAnalysisType(e.target.value)}
                    >
                        <MenuItem value="popular">受歡迎程度（總修課學生數）</MenuItem>
                        <MenuItem value="hardworking">爆肝程度（開課總數）</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    size="small"
                    label="Limit"
                    type="number"
                    value={fetchLimit}
                    onChange={(e) => setFetchLimit(e.target.value)}
                    sx={{ marginRight: 2, width: '100px' }}
                />
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
                                    <TableCell>教授名稱</TableCell>
                                    <TableCell>{analysisType === 'popular' ? "總修課學生數" : "總授課數"}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : data
                                ).map((professor, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{professor[1]}</TableCell>
                                        <TableCell>{professor[2]}</TableCell>
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

export default ProfessorStatsTable
