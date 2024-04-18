import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from '@chakra-ui/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    studentName: '',
    studentID: '',
  });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [matchingRecords, setMatchingRecords] = useState([]);
  useEffect(() => {
    setTimeSlots(location.state.timeSlots);
    fetchStudentData();
  }, [id, location]);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://192.168.0.100:5000/api/${id}`);
      const {
        studentNo,
        studentFirstName,
        studentMiddleName,
        studentLastName,
        year,
        section,
      } = response.data;
      const studentName = `${studentFirstName} ${
        studentMiddleName ? studentMiddleName + ' ' : ''
      }${studentLastName}`;
      setFormData({ studentName, studentID: studentNo });
      setAttendanceRecords(response.data.timeEntries);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const isStudentPresent = (timeSlotStartTime, studentTimeIn) => {
    const studentTime = moment(studentTimeIn).format('HH:mm');
    const startTime = moment(timeSlotStartTime, 'HH:mm');
    const studentMoment = moment(studentTime, 'HH:mm');
    const startMinutes = startTime.hours() * 60 + startTime.minutes();
    const studentMinutes = studentMoment.hours() * 60 + studentMoment.minutes();
    const differenceInMinutes = Math.abs(startMinutes - studentMinutes);
    return differenceInMinutes <= 60;
  };

  useEffect(() => {
    // Iterate over time slots and attendance records to find matching records
    const newMatchingRecords = [];
    timeSlots.forEach(timeSlot => {
      console.log(timeSlot);
      attendanceRecords.forEach(record => {
        if (isStudentPresent(timeSlot.startTime, record.timeIn)) {
          const date = new Date(record.timeIn);
          const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ];
          const dayOfWeek = daysOfWeek[date.getDay()];
          if (
            timeSlot.dayOfWeek === dayOfWeek &&
            timeSlot.room === record.room
          ) {
            const studentTime = moment(record.timeIn).format('HH:mm');
            const startTime = moment(timeSlot.startTime, 'HH:mm');
            const studentMoment = moment(studentTime, 'HH:mm');
            const startMinutes = startTime.hours() * 60 + startTime.minutes();
            const studentMinutes =
              studentMoment.hours() * 60 + studentMoment.minutes();
            const differenceInMinutes = Math.abs(startMinutes - studentMinutes);

            const remark = differenceInMinutes > 15 ? 'Late' : 'On-Time';

            // Add the matching record with the remark
            newMatchingRecords.push({ ...record, remark });
          }
        }
      });
      newMatchingRecords.sort((a, b) => {
        return new Date(a.timeIn) - new Date(b.timeIn);
      });
    });
    // Set matching records state
    setMatchingRecords(newMatchingRecords);
  }, [attendanceRecords, timeSlots]);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const { studentName, studentID } = formData;

    // Student information
    pdf.text('Student Name: ' + studentName, 10, 10);
    pdf.text('Student ID: ' + studentID, 10, 20);
    pdf.text('Student Attendance Record', 10, 30);

    // Attendance records
    const columns = ['Date', 'Time In', 'Time Out', 'Remarks'];
    const rows = matchingRecords.map(record => [
      moment(record.timeIn).format('MMMM DD, YYYY'), // Format date as "Month DD, YYYY"
      moment(record.timeIn).format('hh:mm A'), // Format time as "hh:mm AM/PM"
      moment(record.timeOut).format('hh:mm A'), // Format time as "hh:mm AM/PM"
      record.remark,
    ]);

    pdf.autoTable({
      startY: 40, // Start printing the table from Y-coordinate 40
      head: [columns],
      body: rows,
    });

    pdf.save('student_attendance_record.pdf');
  };

  const handleAnalytics = () => {
    navigate('/analytics', { state: { matchingRecords } });
  };

  return (
    <Box
      height="100vh"
      background={`url(${process.env.PUBLIC_URL}/images/background.jpg) no-repeat center center fixed`}
      backgroundSize="cover"
    >
      <Box
        p={8}
        maxWidth="800px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        margin="auto"
        backgroundColor="rgba(255,255,255,0.8)"
      >
        <Heading mb={4}>Student Log</Heading>
        <FormControl mb={4}>
          <FormLabel htmlFor="studentName">Student Name</FormLabel>
          <Input
            id="studentName"
            type="text"
            placeholder="Enter student name"
            name="studentName"
            value={formData.studentName}
            readOnly
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="studentID">Student ID</FormLabel>
          <Input
            id="studentID"
            type="text"
            placeholder="Enter student ID"
            name="studentID"
            value={formData.studentID}
            readOnly
          />
        </FormControl>
        <Table variant="simple" mb={4}>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Room</Th>
              <Th>Time In</Th>
              <Th>Time Out</Th>
              <Th>Remarks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {matchingRecords?.map((record, index) => (
              <Tr key={index}>
                <Td>{moment(record.timeIn).format('MMMM DD, YYYY')}</Td>
                <Td>{record.room}</Td>
                <Td>{moment(record.timeIn).format('hh:mm A')}</Td>
                <Td>
                  {record.timeOut
                    ? moment(record.timeOut).format('hh:mm A')
                    : '---------'}
                </Td>
                <Td>{record.remark}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button colorScheme="blue" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <Button colorScheme="blue" ml={4} onClick={handleAnalytics}>
          Analytics
        </Button>
      </Box>
    </Box>
  );
};

export default StudentProfile;
