import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import HomePage from './containers/Home';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <div className='Content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
