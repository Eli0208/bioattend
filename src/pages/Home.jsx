import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Image,
  Heading,
  Button,
  Box, // Add Box component from Chakra UI
} from '@chakra-ui/react';
import profpic from '../assets/profilepic.webp';
import AddClass from './AddClass';
import axios from 'axios';

function Home() {
  const [userName, setUserName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen size is less than or equal to a certain breakpoint (e.g., 768px)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Call handleResize initially
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);

      const username = decodedToken.username;
      axios
        .get('http://192.168.0.100:5000/api/users/getclass', {
          params: { username: username },
        })
        .then(response => {
          setClasses(response.data.classes);
        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });
    }
  }, [isOpen]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmitClass = newClassData => {
    setClasses(prevClasses => [...prevClasses, newClassData]);
    handleCloseModal();
  };

  return (
    <>
      {!isMobile && (
        <Flex
          flexDirection="column"
          backgroundColor="#333"
          color="#fff"
          width="200px"
          height="100vh"
          position="fixed"
          left={0}
          alignItems="center"
          justifyContent="center"
          padding="20px"
        >
          <Image src={profpic} alt="icon" borderRadius="full" boxSize="100px" />
          <Heading size="md" textAlign="center" marginTop="20px">
            {userName || 'Guest'}
          </Heading>
        </Flex>
      )}
      <Flex
        marginLeft={isMobile ? 0 : '200px'} // Adjust marginLeft based on isMobile state
        padding="20px"
        flexDirection="column"
        flex="1"
        position="relative"
      >
        <Box overflowX="auto">
          {' '}
          {/* Wrap the Table inside a Box component with overflowX: auto */}
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Classes</Th>
                <Th>Year</Th>
                <Th>Section</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {classes.map(classItem => (
                <Tr key={classItem._id}>
                  <Td>{classItem.subjectCode}</Td>
                  <Td>{classItem.year}</Td>
                  <Td>{classItem.section}</Td>
                  <Td>
                    <Link to={`/viewclass/${classItem._id}`}>
                      <Button colorScheme="blue" size="sm">
                        View Class
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Button
          mt="4vh"
          alignSelf="flex-end"
          colorScheme="blue"
          onClick={handleOpenModal}
        >
          Add Class
        </Button>
        <AddClass
          isOpen={isOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitClass}
        />
      </Flex>
    </>
  );
}

export default Home;
