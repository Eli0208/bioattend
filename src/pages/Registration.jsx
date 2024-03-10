import React, { useState } from 'react';
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';

function Registration() {
  const [studentNo, setStudentNo] = useState('');
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentMiddleName, setStudentMiddleName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [fingerprint, setFingerprint] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission, you can send data to server or perform any other actions
    console.log({
      studentNo,
      studentFirstName,
      studentMiddleName,
      studentLastName,
      year,
      section,
      fingerprint,
    });
    // Reset form fields if needed
    setStudentNo('');
    setStudentFirstName('');
    setStudentMiddleName('');
    setStudentLastName('');
    setYear('');
    setSection('');
    setFingerprint('');
  };

  return (
    <Container maxW="lg" centerContent>
      <Heading as="h2" size="xl" mb={6}>
        Student Registration
      </Heading>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <FormControl mb={3}>
          <FormLabel>Student No.</FormLabel>
          <Input
            type="text"
            value={studentNo}
            onChange={e => setStudentNo(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Student's First Name</FormLabel>
          <Input
            type="text"
            value={studentFirstName}
            onChange={e => setStudentFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Student's Middle Name</FormLabel>
          <Input
            type="text"
            value={studentMiddleName}
            onChange={e => setStudentMiddleName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Student's Last Name</FormLabel>
          <Input
            type="text"
            value={studentLastName}
            onChange={e => setStudentLastName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Year</FormLabel>
          <Select value={year} onChange={e => setYear(e.target.value)}>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
          </Select>
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Section</FormLabel>
          <Select value={section} onChange={e => setSection(e.target.value)}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </Select>
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Fingerprint</FormLabel>
          <Input
            type="text"
            value={fingerprint}
            onChange={e => setFingerprint(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Registration;
