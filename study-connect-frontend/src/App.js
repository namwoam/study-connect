import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import HomePage from './containers/Home';
import Login from './containers/Login';
import './App.css';

// https://zenoo.github.io/mui-theme-creator/#
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E57C00',
    },
    secondary: {
      main: '#E3C589',
    },
    success: {
      main: '#0288d1',
    },
    info: {
      main: '#217d32',
    },
  },
  shape: {
    borderRadius: '10px',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
            backgroundColor: '#fff',
        }
      }
    }
  }
});

function App() {
  const [islogin, setIslogin] = useState(false);
  const [userID, setUserID] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <div className='Content'>
          <Routes>
            {islogin ? 
            <Route path="/" element={<HomePage user={userID}/>} />
            : 
            <Route path="/" element={<Login setLogin={setIslogin} setuser={setUserID}/>}></Route>
            }            
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
