import React, { useState } from 'react';
import { Box, Stack, Link, Select, useBreakpointValue } from '@chakra-ui/react';

function DatabasesSideBar({ setSelectedYear }) {
  // Function to handle year selection
  const handleYearClick = year => {
    setSelectedYear(year);
  };

  // Define the breakpoint value to switch to mobile view
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
        <Box
          as="nav"
          bg="blue.500"
          color="white"
          width="100%"
          px="4"
          py="3"
          position="fixed"
          top="60px" // Adjust the top value to accommodate the header height
          zIndex="1000"
        >
          <Select
            fontSize="xl"
            onChange={e => handleYearClick(e.target.value)}
            defaultValue="Select Year"
          >
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
          </Select>
        </Box>
      ) : (
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
          marginTop="7vh"
          position="fixed" // Adjust the position to fixed
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
      )}
    </>
  );
}

export default DatabasesSideBar;
