import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/loginpage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setMessage(`Login successful! Welcome, ${result.status}!`);
        navigate('/home');
      } else {
        const errorData = await response.json();
        setMessage(`Login failed. ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Paper elevation={5} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px' }}>
        <Typography variant="h5" component="h1" style={{ marginBottom: '20px', color: '#333' }}>
          Login Page
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='primary'
            style={{ marginTop: '20px', backgroundColor: '#2196F3', color: '#fff' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
        {message && <Typography variant="body1" style={{ marginTop: '20px', color: '#FF5722' }}>{message}</Typography>}
      </Paper>
    </Container>
  );
}

export default LoginPage;
