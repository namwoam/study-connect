import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid, Snackbar } from '@mui/material';

const Login = ({setLogin, setuser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    
    if (username === password) {
        setLogin(true);
        setuser(username);
    }
    else {
        setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ width: '100%', marginTop: 10 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ marginTop: 20 }}
          >
            Login
          </Button>
        </form>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={handleCloseSnackbar}
        message="Login failed! Please check your credentials."
      />
    </Container>
  );
};

export default Login;