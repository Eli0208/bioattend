import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react';
import bg from '../assets/WEBSITE.png';

const LoginPage = ({ onLogin }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://192.168.0.100:5000/api/users/login',
        formData
      );
      // Authentication successful
      localStorage.setItem('token', response.data.token); // Save token to local storage
      onLogin(); // Notify parent component (App) of successful login
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Authentication failed
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      height="100vh"
      background={`url(${bg}) no-repeat center center fixed`}
      backgroundSize="cover"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        p={8}
        maxWidth="400px"
        width="90%"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        backgroundColor="rgba(255,255,255,0.8)"
      >
        <Heading mb={4} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
