import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import Swal from 'sweetalert2';

const RegisterProfPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://192.168.0.100:5000/api/users/register',
        formData
      );
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your registration has been successfully submitted.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: 'There was a problem with the registration. Please try again later.',
      });
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} mx={5}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Register
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterProfPage;
