import React from 'react';
import { Flex, Box, Link, Spacer } from '@chakra-ui/react';
import fpLogo from '../assets/fingerprint.png';
import { Image } from '@chakra-ui/react';

const Navbar = () => {
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
        <Link href="/databases" p="2">
          Databases
        </Link>
        <Link href="/register" p="2">
          Registration
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
