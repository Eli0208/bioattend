import React from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsPage = () => {
  // Dummy data for demonstration
  const data = {
    labels: ['Lateness', 'On Time', 'Early Out'],
    datasets: [
      {
        data: [20, 50, 30], // Sample data percentages
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <Box p={8} textAlign="center">
      <Heading mb={4}>Analytics</Heading>
      <Center>
        <Box
          maxWidth="600px"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
        >
          <Doughnut data={data} />
        </Box>
      </Center>
    </Box>
  );
};

export default AnalyticsPage;
