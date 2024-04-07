import React, { useEffect, useState } from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsPage = () => {
  const location = useLocation();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.matchingRecords) {
      const matchingRecords = location.state.matchingRecords;
      console.log(matchingRecords);
      // Initialize counters for each remark type
      let latenessCount = 0;
      let onTimeCount = 0;
      let earlyOutCount = 0;

      // Iterate through matching records and count each remark type
      matchingRecords.forEach(record => {
        if (record.remark === 'Late') {
          latenessCount++;
        } else if (record.remark === 'On-Time') {
          onTimeCount++;
        } else if (record.remark === 'Absences') {
          earlyOutCount++;
        }
      });

      // Update chart data with the computed counts
      setChartData({
        labels: ['Lateness', 'On Time', 'Absences'],
        datasets: [
          {
            data: [latenessCount, onTimeCount, earlyOutCount],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      });
    }
  }, [location]);

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
          {chartData && <Doughnut data={chartData} />}
        </Box>
      </Center>
    </Box>
  );
};

export default AnalyticsPage;
