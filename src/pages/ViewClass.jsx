import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  VStack,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Flex,
} from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import EnrollStudent from './EnrollStudent';

const ViewClass = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const name = decodedToken.name;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://192.168.0.100:5000/api/users/class?classId=${id}`)
      .then(response => {
        setClassData(response.data);
        setEnrolledStudents(response.data?.class?.enrolledStudents || []);
      })
      .catch(error => {
        console.error('Error fetching class data:', error);
      });
  }, [id]);

  if (!classData) {
    return <div>Loading...</div>;
  }

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle enrollment of a student
  const handleEnrollStudent = student => {
    // Implement your logic to enroll the student
    console.log(`Enrolling student: ${student.name}`);
    // Close the modal after enrolling
    handleCloseModal();
    // Update the enrolled students list
    setEnrolledStudents(prevEnrolledStudents => [
      ...prevEnrolledStudents,
      student,
    ]);
  };

  // Function to handle viewing the log
  const handleViewLog = (studentNo, timeSlots) => {
    // Pass the necessary data to the log page when navigating
    navigate(`/student/${studentNo}`, {
      state: { timeSlots },
    });
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} spacing={10}>
      <VStack ml={3} mt={3} spacing={4} align="start">
        <HStack>
          <Text fontWeight="bold">Instructor:</Text>
          <Text>{name}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Subject Code:</Text>
          <Text>{classData?.class?.subjectCode}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Year & Section:</Text>
          <Text>
            {classData?.class?.year} - {classData?.class?.section}
          </Text>
        </HStack>

        <Text fontWeight="bold">Time Slots:</Text>
        <Box overflowX="auto">
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th>Day</Th>
                <Th>Start Time</Th>
                <Th>End Time</Th>
                <Th>Room</Th>
              </Tr>
            </Thead>
            <Tbody>
              {classData?.class?.timeSlots?.map((slot, index) => (
                <Tr key={index}>
                  <Td>{slot.dayOfWeek}</Td>
                  <Td>{slot.startTime}</Td>
                  <Td>{slot.endTime}</Td>
                  <Td>{slot.room}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Button colorScheme="blue" mt={3} onClick={handleOpenModal}>
          Enroll Student
        </Button>
      </VStack>

      {/* Student list */}
      <Box overflowX="auto" mt={{ base: '4', md: '0' }}>
        <VStack spacing={4} align="start">
          <Text fontWeight="bold">Enrolled Students:</Text>
          <Table variant="striped" width="60vw">
            <Thead>
              <Tr>
                <Th>Student No.</Th>
                <Th>Student Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {enrolledStudents.map((student, index) => (
                <Tr key={index}>
                  <Td>{student.studentNo}</Td>
                  <Td>
                    {student.studentFirstName} {student.studentMiddleName}{' '}
                    {student.studentLastName}
                  </Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() =>
                        handleViewLog(
                          student.studentNo,
                          classData.class.timeSlots
                        )
                      }
                    >
                      View Log
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Box>

      {/* Enroll Student Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent maxW={{ base: '100vw', md: '50vw' }}>
          <ModalHeader>Enroll Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EnrollStudent onEnroll={handleEnrollStudent} classId={id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ViewClass;
