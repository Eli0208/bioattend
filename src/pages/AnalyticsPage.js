import React, { useEffect, useState } from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

ChartJS.register(
  BarElement,
  CategoryScale,
  ArcElement,
  LinearScale,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const location = useLocation();
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    if (location.state && location.state.matchingRecords) {
      const matchingRecords = location.state.matchingRecords;
      const rooms = {};

      matchingRecords.forEach(record => {
        const { room, timeIn, timeOut, remark } = record;
        if (!rooms[room]) {
          rooms[room] = {
            totalHoursCount: 0,
            totalTime: 0,
            latenessCount: 0,
            onTimeCount: 0,
            earlyOutCount: 0,
            weeklyVisitsData: {},
            monthlyVisitsData: {},
          };
        }

        const timeDiff = Math.abs(new Date(timeOut) - new Date(timeIn));
        rooms[room].totalHoursCount += timeDiff / (1000 * 60 * 60);
        rooms[room].totalTime += timeDiff;

        if (remark === 'Late') {
          rooms[room].latenessCount++;
        } else if (remark === 'On-Time') {
          rooms[room].onTimeCount++;
        } else if (remark === 'Absences') {
          rooms[room].earlyOutCount++;
        }

        // Weekly visits
        const weekNumber = getWeekNumber(new Date(timeIn));
        if (!rooms[room].weeklyVisitsData[weekNumber]) {
          rooms[room].weeklyVisitsData[weekNumber] = 1;
        } else {
          rooms[room].weeklyVisitsData[weekNumber]++;
        }

        // Monthly visits
        const monthNumber = new Date(timeIn).getMonth();
        if (!rooms[room].monthlyVisitsData[monthNumber]) {
          rooms[room].monthlyVisitsData[monthNumber] = 1;
        } else {
          rooms[room].monthlyVisitsData[monthNumber]++;
        }
      });
      const roomChartData =
        parseInt(rooms.length) < 2
          ? Object.keys(rooms).map(room => ({
              room,
              totalHours: rooms[room].totalHoursCount.toFixed(2),
              averageTimePerSession: (
                rooms[room].totalTime /
                matchingRecords.length /
                (1000 * 60)
              ).toFixed(2),
              chartData: {
                labels: ['Lateness', 'On Time', 'Absences'],
                datasets: [
                  {
                    data: [
                      rooms[room].latenessCount,
                      rooms[room].onTimeCount,
                      rooms[room].earlyOutCount,
                    ],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],
              },
              weeklyVisitsData: generateBarChartData(
                rooms[room].weeklyVisitsData,
                'Week'
              ),
              monthlyVisitsData: generateBarChartData(
                rooms[room].monthlyVisitsData,
                'Month'
              ),
            }))
          : Object.keys(rooms).map(room => ({
              room,
              totalHours: rooms[room].totalHoursCount.toFixed(2),
              averageTimePerSession: (
                rooms[room].totalTime /
                (matchingRecords.length / 2) /
                (1000 * 60)
              ).toFixed(2),
              chartData: {
                labels: ['Lateness', 'On Time', 'Absences'],
                datasets: [
                  {
                    data: [
                      rooms[room].latenessCount,
                      rooms[room].onTimeCount,
                      rooms[room].earlyOutCount,
                    ],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],
              },
              weeklyVisitsData: generateBarChartData(
                rooms[room].weeklyVisitsData,
                'Week'
              ),
              monthlyVisitsData: generateBarChartData(
                rooms[room].monthlyVisitsData,
                'Month'
              ),
            }));

      setRoomData(roomChartData);
    }
  }, [location]);

  const getWeekNumber = date => {
    const janFirst = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - janFirst) / (24 * 60 * 60 * 1000)) + 1;
    const firstMonday = janFirst.getDay() === 0 ? 1 : 34 - janFirst.getDay();
    const weekNumber = Math.ceil((dayOfYear - firstMonday + 1) / 7);
    return weekNumber;
  };

  const generateBarChartData = (dataObj, span) => {
    const labels = Object.keys(dataObj)
      .map(label => parseInt(label))
      .sort((a, b) => a - b);
    const data = Object.values(dataObj);
    return {
      labels: labels.map(label => `${span} ${label}`),
      datasets: [
        {
          label: 'Visits',
          data: data,
          backgroundColor: '#36A2EB',
        },
      ],
    };
  };

  return (
    <Box p={8} textAlign="center">
      <Heading mb={4}>Analytics</Heading>
      {roomData.map((room, index) => (
        <Box key={index} mb={8}>
          <Text>Room: {room.room}</Text>
          <Text>Total Hours: {room.totalHours}</Text>
          <Text>
            Average Time Per Session: {room.averageTimePerSession} minutes
          </Text>
          {room.chartData && (
            <Center mb={4}>
              <Box maxWidth="400px">
                <Doughnut data={room.chartData} />
              </Box>
            </Center>
          )}
          {room.weeklyVisitsData && (
            <Box mb={4}>
              <Text>Weekly Visits</Text>
              <Box maxWidth="400px">
                <Bar data={room.weeklyVisitsData} />
              </Box>
            </Box>
          )}
          {room.monthlyVisitsData && (
            <Box>
              <Text>Monthly Visits</Text>
              <Box maxWidth="400px">
                <Bar data={room.monthlyVisitsData} />
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AnalyticsPage;
