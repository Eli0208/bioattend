import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';
import DatabasesSideBar from '../components/DatabasesSideBar';

function DataBases() {
  const [students, setStudents] = useState([]);
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedYear, setSelectedYear] = useState('First Year');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalMaxWidth = useBreakpointValue({ base: '100vw', md: '45vw' });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://192.168.0.100:5000/api/students'
        );
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    }

    fetchData();
  }, []);

  const handleStudentClick = student => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = time => {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  const boxWidth = useBreakpointValue({ base: '100%', md: '85%' });
  const marginLeft = useBreakpointValue({ base: '0', md: '15%' });
  const marginTop = useBreakpointValue({ base: '100px', md: '0' });
  return (
    <Flex>
      <DatabasesSideBar setSelectedYear={setSelectedYear} />
      <Box w={boxWidth} ml={marginLeft} mt={marginTop}>
        <Flex justifyContent="flex-end" mb={4}>
          <Select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            width="150px"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </Select>
        </Flex>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Student No.</Th>
                <Th>First Name</Th>
                <Th>Middle Name</Th>
                <Th>Last Name</Th>
                <Th>Year</Th>
                <Th>Section</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students
                .filter(
                  student =>
                    student.section === selectedSection &&
                    student.year === selectedYear
                )
                .map(student => (
                  <Tr
                    key={student._id}
                    onClick={() => handleStudentClick(student)}
                  >
                    <Td>{student.studentNo}</Td>
                    <Td>{student.studentFirstName}</Td>
                    <Td>{student.studentMiddleName}</Td>
                    <Td>{student.studentLastName}</Td>
                    <Td>{student.year}</Td>
                    <Td>{student.section}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent maxW={modalMaxWidth}>
            <ModalHeader>Student Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedStudent && (
                <Box>
                  <Text>ID: {selectedStudent.studentNo}</Text>
                  <Text>First Name: {selectedStudent.studentFirstName}</Text>
                  <Text>Middle Name: {selectedStudent.studentMiddleName}</Text>
                  <Text>Last Name: {selectedStudent.studentLastName}</Text>
                  <Text>Year: {selectedStudent.year}</Text>
                  <Text>Section: {selectedStudent.section}</Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Date</Th>
                        <Th>Time In</Th>
                        <Th>Time Out</Th>
                        <Th>Room</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedStudent.timeEntries.map((entry, index) => (
                        <Tr key={index}>
                          <Td>{formatDate(entry.timeIn)}</Td>
                          <Td>{formatTime(entry.timeIn)}</Td>
                          <Td>{formatTime(entry.timeOut)}</Td>
                          <Td>{entry.room}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default DataBases;
