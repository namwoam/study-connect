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
    <Container component="main" maxWidth="xl" style={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={3} style={{ height: '100vh', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Grid container style={{ height: '80vh'}}>
        <Grid 
            item
            xs={6}
            style={{
              background: 'linear-gradient(to bottom, #ffdcB9, #ff5733)',
              borderRadius: '20px',
              padding: 20,
              height: '100%',
            }}
          >
        </Grid>
        <Grid item xs={6} style={{ padding: 20, display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
          <Typography component="h3" variant="h5" style={{ position: 'absolute', top: 10, right: 20, color: '#ff8000'}}>
            StudyConnect
          </Typography>
          <Typography component="h8" variant="h8">
            Welcome to StudyConnect!
          </Typography>
          <Typography component="h1" variant="h3">
            Sign in 
          </Typography>
          <form style={{ width: '100%', marginTop: 10, justifyContent: 'right' }}>
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
              style={{ marginTop: 20, width: '50%' }}
            >
              Login
            </Button>
          </form>
          </Grid>
        </Grid>
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