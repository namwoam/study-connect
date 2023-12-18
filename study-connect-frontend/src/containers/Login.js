import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid, Snackbar } from '@mui/material';
import { fetchUserInfo } from '../utils/fetchUser';
import instance from '../instance';

const Login = ({setLogin, setuser, setIsadmin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await instance.post('/login', {
        username: username,
        password: password,
      });

      if (response.data.success) {
        const isAdmin = response.data.data.is_admin;
        if (isAdmin) {
          localStorage.setItem('isAdmin', 1);
          setIsadmin(true);
        } else {
          localStorage.setItem('isAdmin', 0);
          setIsadmin(false);
        }
        
        setLogin(true);
        setuser(username);
        setLoginMessage('Login successful!');
        setOpenSnackbar(true);
      } else {
        setLoginMessage("Login failed! Please check your credentials.")
        setOpenSnackbar(true);
      }
    } catch (error) {
      setLoginMessage("Login failed! Please check your credentials.")
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xl" style={{ height: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={0} style={{ height: '100vh', width: '80%', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
      <Grid container style={{ height: '80vh'}}>
        <Grid 
            item
            xs={6}
            style={{
              background: 'linear-gradient(to bottom, #ffdcB9, #ff5733)',
              opacity: '0.7',
              borderRadius: '20px',
              padding: 20,
              height: '100%',
            }}
          >
            <Typography component="h6" variant="h6" fontWeight={800} style={{ position: 'relative', top: '500px', color: '#fff'}}>
              StudyConnect helps you connect study partners!
            </Typography>
        </Grid>
        <Grid item xs={6} style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography component="h6" variant="h6" fontWeight={800} style={{ position: 'absolute', top: '20px', right: '50px', color: '#ff8000'}}>
            StudyConnect
          </Typography>
          <Typography component="h6" variant="h6" gutterBottom>
            Welcome to StudyConnect!
          </Typography>
          <Typography component="h1" variant="h4" fontWeight={800} gutterBottom>
            Sign in 
          </Typography>
          <form style={{ width: '90%', marginTop: 10, textAlign: 'right' }}>
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
              style={{ marginTop: 20, width: '120px', color: "#fff", fontWeight: 600}}
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
        message={loginMessage}
      />
    </Container>
  );
};

export default Login;