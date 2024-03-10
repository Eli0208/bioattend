import React from 'react';
import { Box, Stack, Link, Text } from '@chakra-ui/react';

function DatabasesSideBar() {
  return (
    <Box
      as="nav"
      bg="blue.500"
      color="white"
      width="250px"
      height="91vh"
      top="0"
      left="0"
      overflowY="auto"
      padding="6"
      marginTop="0.5vh"
    >
      <Stack spacing="4">
        <Link href="#" fontSize="xl">
          First Year
        </Link>
        <Link href="#" fontSize="xl">
          Second Year
        </Link>
        <Link href="#" fontSize="xl">
          Third Year
        </Link>
        <Link href="#" fontSize="xl">
          Fourth Year
        </Link>
      </Stack>
    </Box>
  );
}

export default DatabasesSideBar;
