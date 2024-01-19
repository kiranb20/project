import React, { useState } from 'react';
import { Button, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const Create = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    roll_no: '',
    name: '',
    selectedOption: '', // To store the selected radio button value
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedOption: value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setMessage('User created successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Failed to create user. ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during user creation:', error);
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h5">Create User</Typography>
      <form onSubmit={handleCreateUser}>
        <TextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Teacher ID/Student Roll No"
          type="text"
          name="roll_no"
          value={formData.roll_no}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Role:</FormLabel>
          <RadioGroup
            row
            aria-label="role"
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleRadioChange}
            required
          >
            <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
            <FormControlLabel value="student" control={<Radio />} label="Student" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create
        </Button>
      </form>
      <Typography>{message}</Typography>
    </div>
  );
};

export default Create;
