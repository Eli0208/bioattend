import React from 'react';
import { Flex, Box, Link, Spacer } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex p="4" bg="blue.500" color="white">
      <Box p="2">
        {/* Your logo or brand */}
        <Link href="/" fontWeight="bold">
          HomeButton
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
