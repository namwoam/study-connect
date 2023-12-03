import { React } from 'react';
import { Alert, Snackbar } from '@mui/material';

const InfoMessage = (open, success, handleClose, alertMessage) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={success ? 2000 : 5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={success ? 'success' : 'error'}
                sx={{ width: '100%' }}
            >
            {alertMessage.split('\n').map((line, index) => (
                <span key={index}>
                {line}
                <br />
                </span>
            ))}
            </Alert>
        </Snackbar>
    );
}

export default InfoMessage;