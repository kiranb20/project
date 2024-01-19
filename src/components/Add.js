import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';

const Add = () => {
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming the API endpoint for posting data
    const apiUrl = 'http://localhost:3000/course/add';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName,
          courseId,
          teacherId,
        }),
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Successfully submitted!' });
      } else {
        setNotification({ type: 'error', message: 'Submission failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setNotification({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20, width: '100%', maxWidth: 400, marginTop: 20 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Add Course
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="courseName"
            label="Course Name"
            name="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="courseId"
            label="Course ID"
            name="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="teacherId"
            label="Teacher ID"
            name="teacherId"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 20 }}>
            Submit
          </Button>
        </form>
        {notification && (
          <div style={{ color: notification.type === 'success' ? 'green' : 'red', marginTop: 20 }}>
            {notification.message}
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Add;
