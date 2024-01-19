import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Container,
  CssBaseline,
  Paper,
  Box,
} from '@mui/material';

function Userslogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });
  const navigate = useNavigate();
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
      role: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        if (result.status === 'success') {
          const dataToSend = { roll_no: response.roll_no };
          console.log(response.roll_no);
          if (result.role === 'student') {
            setMessage(`Login successful! Welcome, ${result.status}!`);
            navigate(`/student/${result.roll_no}`);
          } else {
            navigate(`teacher/${result.emp_id}`);
          }
        } else {
          setMessage('Login failed.');
        }
      } else {
        const errorData = await response.json();
        setMessage(`Login failed. ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ marginTop: '8rem', padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#2196F3' }}>
          WELCOME
        </Typography>
        <form onSubmit={handleLogin}>
          <Box>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Box>
          <RadioGroup row value={formData.role} onChange={handleRadioChange}>
            <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
            <FormControlLabel value="student" control={<Radio />} label="Student" />
          </RadioGroup>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        {message && (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default Userslogin;
