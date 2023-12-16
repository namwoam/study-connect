import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import MainView from './containers/MainView';
import Login from './containers/Login';
import './App.css';

// https://zenoo.github.io/mui-theme-creator/#

// pages['Home', 'Friend', 'Group']

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
    borderRadius: 10,
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
  const storedUserID = localStorage.getItem('userID');
  const [islogin, setIslogin] = useState(storedUserID ? true : false);
  const [userID, setUserID] = useState(storedUserID ? storedUserID : '');
  const storedPage = localStorage.getItem('currentPage');
  const initialPage = storedPage ? parseInt(storedPage, 10) : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const storedAuthen = localStorage.getItem('isAdmin');
  const [isAdmin, setIsadmin] = useState(storedAuthen ? true : false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    localStorage.setItem('userID', userID);
  }, [userID])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {islogin ? <Header userID={userID} currentPage={currentPage} onPageChange={handlePageChange} setIslogin={setIslogin} isAdmin={isAdmin}/>: <></>}
        <div className='Content'>
          <Routes>
            {islogin ? 
            <Route path="/" element={<MainView currentPage={currentPage} userID={userID}/> } />
            : 
            <Route path="/" element={<Login setLogin={setIslogin} setuser={setUserID} setIsadmin={setIsadmin}/>}></Route>
            }            
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
