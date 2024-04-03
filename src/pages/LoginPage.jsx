import React, { useState } from 'react';
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

const LoginPage = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you can perform authentication logic
    if (formData.username === 'admin' && formData.password === 'password') {
      // Authentication successful
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
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
      height="94vh"
      background={`url(${bg}) no-repeat center center fixed`}
      backgroundSize="cover"
      pt={250}
    >
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        ml={1300}
        backgroundColor="rgba(255,255,255,0.8)" // Adjust the opacity if needed
      >
        <Heading mb={4}>Login</Heading>
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
