import React from 'react';
import { Box, Stack, Link } from '@chakra-ui/react';

function DatabasesSideBar({ setSelectedYear }) {
  const handleYearClick = year => {
    setSelectedYear(year);
  };

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
        <Link fontSize="xl" onClick={() => handleYearClick('First Year')}>
          First Year
        </Link>
        <Link fontSize="xl" onClick={() => handleYearClick('Second Year')}>
          Second Year
        </Link>
        <Link fontSize="xl" onClick={() => handleYearClick('Third Year')}>
          Third Year
        </Link>
        <Link fontSize="xl" onClick={() => handleYearClick('Fourth Year')}>
          Fourth Year
        </Link>
      </Stack>
    </Box>
  );
}

export default DatabasesSideBar;
