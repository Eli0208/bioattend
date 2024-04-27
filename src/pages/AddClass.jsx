import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importing jwt_decode function

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
  HStack,
} from '@chakra-ui/react';

const AddClass = ({ isOpen, onClose, onSubmit }) => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectDescription, setSubjectDescription] = useState('');
  const [year, setYear] = useState('First Year');
  const [section, setSection] = useState('A');
  const [room, setRoom] = useState('Analog Lab'); // New state for room
  const [timeSlots, setTimeSlots] = useState([
    { dayOfWeek: 'Monday', startTime: '', endTime: '', room: 'Analog Lab' },
  ]); // State for time slots

  const handleAddTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      { dayOfWeek: '', startTime: '', endTime: '', room },
    ]);
  };

  const handleRemoveTimeSlot = index => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleDayOfWeekChange = (index, value) => {
    setTimeSlots(prevTimeSlots =>
      prevTimeSlots.map((slot, i) =>
        i === index ? { ...slot, dayOfWeek: value } : slot
      )
    );
  };

  const handleStartTimeChange = (index, value) => {
    setTimeSlots(prevTimeSlots =>
      prevTimeSlots.map((slot, i) =>
        i === index ? { ...slot, startTime: value } : slot
      )
    );
  };

  const handleEndTimeChange = (index, value) => {
    setTimeSlots(prevTimeSlots =>
      prevTimeSlots.map((slot, i) =>
        i === index ? { ...slot, endTime: value } : slot
      )
    );
  };

  const handleRoomChange = (index, value) => {
    setTimeSlots(prevTimeSlots =>
      prevTimeSlots.map((slot, i) =>
        i === index ? { ...slot, room: value } : slot
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;

      const newClass = {
        username,
        subjectCode,
        subjectDescription,
        timeSlots,
        year,
        section,
        room,
      };

      const response = await axios.post(
        'http://localhost:5000/api/users/addclass',
        newClass
      );
      onSubmit(response.data); // Assuming the backend returns the added class
      onClose();
      console.log(newClass);
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Class</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Subject Code</FormLabel>
            <Input
              value={subjectCode}
              onChange={e => setSubjectCode(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Subject Description</FormLabel>
            <Input
              value={subjectDescription}
              onChange={e => setSubjectDescription(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Year</FormLabel>
            <Select value={year} onChange={e => setYear(e.target.value)}>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Section</FormLabel>
            <Select value={section} onChange={e => setSection(e.target.value)}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
          </FormControl>
          {timeSlots.map((slot, index) => (
            <VStack key={index} mt={4} spacing={4}>
              <FormControl>
                <FormLabel>Day of Week</FormLabel>
                <Select
                  value={slot.dayOfWeek}
                  onChange={e => handleDayOfWeekChange(index, e.target.value)}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="time"
                  value={slot.startTime}
                  onChange={e => handleStartTimeChange(index, e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="time"
                  value={slot.endTime}
                  onChange={e => handleEndTimeChange(index, e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Room</FormLabel>
                <Select
                  value={slot.room}
                  onChange={e => handleRoomChange(index, e.target.value)}
                >
                  <option value="Analog Lab">Analog Lab</option>
                  <option value="Digital Lab">Digital Lab</option>
                </Select>
              </FormControl>
              <Button onClick={() => handleRemoveTimeSlot(index)}>
                Remove
              </Button>
            </VStack>
          ))}
          <HStack mt={4} width="100%" justifyContent="space-between">
            <Button onClick={handleAddTimeSlot}>Add Time Slot</Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Add
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddClass;
