import React from 'react';
import { Flex, Box, Link, Spacer } from '@chakra-ui/react';
import fpLogo from '../assets/fingerprint.png';
import { Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    onLogout(); // Call onLogout to perform logout actions
    navigate('/'); // Navigate to '/' after logout
  };

  return (
    <Flex p="4" bg="blue.500" color="white">
      <Box>
        {/* Your logo or brand */}
        <Link href="/" fontWeight="bold">
          <Image src={fpLogo} alt="logo" h="3vh" />
        </Link>
      </Box>
      <Spacer />
      <Box>
        {isLoggedIn ? (
          <>
            <Link href="/databases" p="2">
              Databases
            </Link>
            <Link href="/register" p="2">
              Registration
            </Link>
            <Link onClick={handleLogout} cursor="pointer" p="2">
              {' '}
              {/* Use handleLogout for logout */}
              Logout
            </Link>
          </>
        ) : null}
      </Box>
    </Flex>
  );
};

export default Navbar;
