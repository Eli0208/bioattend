import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from '@chakra-ui/react';

const StudentProfile = () => {
  const toast = useToast();
  const [formData] = useState({
    studentName: 'John Doe',
    studentID: '123456',
  });

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      date: '2024-04-05',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      remarks: 'On-time',
    },
    {
      date: '2024-04-04',
      timeIn: '09:15 AM',
      timeOut: '05:30 PM',
      remarks: 'Late',
    },
    {
      date: '2024-04-03',
      timeIn: '08:45 AM',
      timeOut: '04:45 PM',
      remarks: 'Early-out',
    },
  ]);

  const handleAttendanceSubmit = e => {
    e.preventDefault();
    // Assuming you have some logic to handle attendance submission
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const newRecord = {
      date: currentDate,
      timeIn: currentTime,
      timeOut: '',
      remarks: '',
    };
    setAttendanceRecords([...attendanceRecords, newRecord]);
    toast({
      title: 'Attendance Recorded',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      height="100vh"
      background={`url(${process.env.PUBLIC_URL}/images/background.jpg) no-repeat center center fixed`}
      backgroundSize="cover"
    >
      <Box
        p={8}
        maxWidth="800px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        margin="auto"
        backgroundColor="rgba(255,255,255,0.8)"
      >
        <Heading mb={4}>Student Log</Heading>
        <form onSubmit={handleAttendanceSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="studentName">Student Name</FormLabel>
            <Input
              id="studentName"
              type="text"
              placeholder="Enter student name"
              name="studentName"
              value={formData.studentName}
              readOnly
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="studentID">Student ID</FormLabel>
            <Input
              id="studentID"
              type="text"
              placeholder="Enter student ID"
              name="studentID"
              value={formData.studentID}
              readOnly
            />
          </FormControl>
        </form>
        <Table variant="simple" mb={4}>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Time In</Th>
              <Th>Time Out</Th>
              <Th>Remarks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendanceRecords.map((record, index) => (
              <Tr key={index}>
                <Td>{record.date}</Td>
                <Td>{record.timeIn}</Td>
                <Td>{record.timeOut}</Td>
                <Td>{record.remarks}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button colorScheme="blue">Analytics</Button>
      </Box>
    </Box>
  );
};

export default StudentProfile;
