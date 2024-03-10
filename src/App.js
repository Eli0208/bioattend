import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Registration from './pages/Registration';
import Home from './pages/Home';
import DataBases from './pages/DataBases';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/databases" element={<DataBases />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
