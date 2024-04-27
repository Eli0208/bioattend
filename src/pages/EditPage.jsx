import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Input,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useHistory
import Swal from 'sweetalert2';

const EditPage = () => {
  const { id } = useParams();
  const history = useNavigate(); // Initialize useHistory hook
  const [student, setStudent] = useState({
    studentNo: '',
    studentFirstName: '',
    studentMiddleName: '',
    studentLastName: '',
    year: '',
    section: '',
    fingerprint: '',
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://192.168.0.100:5000/api/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://192.168.0.100:5000/api/editstudent/${student._id}`,
        student
      );
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Student details updated successfully!',
      }).then(() => {
        // Redirect to /databases
        history('/databases');
      });
    } catch (error) {
      console.error('Error updating student:', error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update student details. Please try again.',
      });
    }
  };

  return (
    <Box p="4">
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <FormControl id="studentNo">
            <FormLabel>Student Number</FormLabel>
            <Input
              type="text"
              name="studentNo"
              value={student.studentNo}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="studentFirstName">
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="studentFirstName"
              value={student.studentFirstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="studentMiddleName">
            <FormLabel>Middle Name</FormLabel>
            <Input
              type="text"
              name="studentMiddleName"
              value={student.studentMiddleName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="studentLastName">
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="studentLastName"
              value={student.studentLastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="year">
            <FormLabel>Year</FormLabel>
            <Select name="year" value={student.year} onChange={handleChange}>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
            </Select>
          </FormControl>
          <FormControl id="section">
            <FormLabel>Section</FormLabel>
            <Select
              name="section"
              value={student.section}
              onChange={handleChange}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
          </FormControl>
          <FormControl id="fingerprint">
            <FormLabel>Fingerprint</FormLabel>
            <Input
              type="text"
              name="fingerprint"
              value={student.fingerprint}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditPage;
