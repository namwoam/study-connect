import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar } from '@mui/material';
import { saveAs } from 'file-saver';
import instance from '../../instance';

const CustomQuery = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExecuteQuery = async () => {
    setLoading(true);
    try {
      const response = await instance.post('/admin/custom_query', { query: query }, { responseType: 'blob' });
        console.log(response);
      // Check if the response is successful
      if (response.status === 200) {
        if (response.data.status_code) {
            setError("SQL error");
        } else {
            saveAs(new Blob([response.data]), 'export.csv');
        }
       
      } else {
        setError('Failed to execute the query');
      }
    } catch (error) {
      setError('Failed to execute the query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TextField
        label="SQL Query"
        multiline
        rows={4}
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '20px', maxWidth: '600px' }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" color="primary" onClick={handleExecuteQuery} sx={{ color: "#fff", fontWeight: 600}}>
          Execute Query
        </Button>
      )}
      {error && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={!!error}
          autoHideDuration={3000}
          onClose={() => setError(null)}
          message={error}
        />
      )}
    </>
  );
};

export default CustomQuery;
