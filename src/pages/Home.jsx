import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
} from '@chakra-ui/react';
import profpic from '../assets/profilepic.webp';
import AddClass from './AddClass';
import axios from 'axios';

function Home() {
  const [userName, setUserName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState([]);

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
    <Flex>
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
        <Image src={profpic} alt="icon" borderRadius="full" boxSize="=100px" />
        <Heading size="md" textAlign="center" marginTop="20px">
          {userName || 'Guest'}
        </Heading>
      </Flex>
      <Flex
        marginLeft="200px"
        padding="20px"
        flexDirection="column"
        flex="1"
        position="relative"
      >
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
                  {/* Use Link component to navigate to /viewclass with _id as parameter */}
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
        <Button
          marginLeft="20px"
          mt="4vh"
          bottom="20px"
          right="20px"
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
    </Flex>
  );
}

export default Home;
