import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Registration from './pages/Registration';
import Home from './pages/Home';
import DataBases from './pages/DataBases';
import LoginPage from './pages/LoginPage';
import StudentProfile from './pages/StudentProfile';
import AnalyticsPage from './pages/AnalyticsPage';
import axios from 'axios';
import AddClass from './pages/AddClass';
import ViewClass from './pages/ViewClass';
import RegisterProfPage from './pages/RegisterProfPage';
import EditPage from './pages/EditPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/databases" element={<DataBases />} />
          <Route path="/student/:id" element={<StudentProfile />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/add" element={<AddClass />} />
          <Route path="/viewclass/:id" element={<ViewClass />} />
          <Route path="/regprof" element={<RegisterProfPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
