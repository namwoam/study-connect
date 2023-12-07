import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import HomePage from './containers/Home';
import FriendPage from './containers/Friend';
import CoursePage from './containers/Course';
import GroupPage from './containers/Group';
import UserPage from './containers/User';
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
  localStorage.clear();
  const [islogin, setIslogin] = useState(localStorage.getItem('islogin')||false);
  const [userID, setUserID] = useState(localStorage.getItem('userID')||'');
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage')||0);

  useEffect(() => {
    localStorage.setItem('islogin', islogin);
    localStorage.setItem('userID', userID);
  }, [islogin, userID])

  const handlePage = () => {
    //['Home', 'Friend', 'Course', 'Group']
    if (currentPage === 0) {
      return <Route path="/" element={<HomePage user={userID}/>} />
    }
    else if (currentPage === 1) {
      return <Route path="/" element={<FriendPage user={userID}/>} />
    }
    else if (currentPage === 2) {
      return <Route path="/" element={<CoursePage user={userID}/>} />
    }
    else if (currentPage === 3) {
      return <Route path="/" element={<GroupPage user={userID}/>} />
    }
    else if (currentPage === 4) {
      return <Route path="/" element={<UserPage user={userID}/>} />
    }
    else {
      return <Route path="/" element={<HomePage user={userID}/>} />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {islogin ? <Header setpage={setCurrentPage}/> : <></>}
        <div className='Content'>
          <Routes>
            {islogin ? 
            handlePage()
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
