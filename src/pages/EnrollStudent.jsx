import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Box,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';

function EnrollStudent({ onEnroll, classId }) {
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const username = decodedToken.username;

  useEffect(() => {
    // Fetch students based on the selected year and section
    fetchStudents();
  }, [selectedYear, selectedSection]);

  const fetchStudents = () => {
    // Set loading to true before making the request
    setLoading(true);
    // Fetch students from the database based on selected year and section
    axios
      .get(
        `http://localhost:5000/api/studentsection?year=${selectedYear}&section=${selectedSection}`
      )
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      })
      .finally(() => {
        // Set loading to false after the request is completed
        setLoading(false);
      });
  };

  const handleEnroll = student => {
    // Pass the enrolled student back to the parent component
    onEnroll({
      ...student,
      year: selectedYear,
      section: selectedSection,
    });

    // Make a POST request to enroll the student
    axios
      .post(`http://localhost:5000/api/users/enroll`, {
        classId: classId,
        studentNo: student.studentNo,
        username: username,
        studentFirstName: student.studentFirstName,
        studentMiddleName: student.studentMiddleName,
        studentLastName: student.studentLastName,
      })
      .then(response => {
        console.log('Student enrolled successfully');
        // If enrollment is successful, refetch the student data to update the list
        fetchStudents();
      })
      .catch(error => {
        console.error('Error enrolling student:', error);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          placeholder="Select Year"
        >
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
          {/* Add more options as needed */}
        </Select>
        <Select
          value={selectedSection}
          onChange={e => setSelectedSection(e.target.value)}
          placeholder="Select Section"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          {/* Add more options as needed */}
        </Select>
      </div>
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : students.length === 0 ? (
        <Center>No students found.</Center>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th>Student No.</Th>
                <Th>Student First Name</Th>
                <Th>Student Last Name</Th>
                <Th>Year</Th>
                <Th>Section</Th>
                <Th>Enroll</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map(student => (
                <Tr key={student.id}>
                  <Td>{student.studentNo}</Td>
                  <Td>{student.studentFirstName}</Td>
                  <Td>{student.studentLastName}</Td>
                  <Td>{student.year}</Td>
                  <Td>{student.section}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEnroll(student)}
                    >
                      Enroll
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </div>
  );
}

export default EnrollStudent;
