import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography, Grid } from '@mui/material';

function StudentList({ courseName }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/enrollments/${courseName}`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, [courseName]);

  const handleUpdate = (studentName, updatedMarks) => {
    axios.post(`http://localhost:3000/enrollments/${studentName}/${courseName}/${updatedMarks}`)
      .then(response => {
        console.log('Update successful:', response.data);
       
      })
      .catch(error => {
        console.error('Error updating marks:', error);
      });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Course ID : {courseName}
      </Typography>

      {students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.student_name}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={student.marks}
                      onChange={(e) => setStudents(prevStudents => {
                        const updatedStudents = [...prevStudents];
                        updatedStudents[index].marks = e.target.value;
                        return updatedStudents;
                      })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(student.student_name, student.marks)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No students available for this course.</Typography>
      )}
    </div>
  );
}

function TeacherPage({ teacher_name }) {
  const currentPath = window.location.pathname;
  const navigate = useNavigate(); 

  const lastSlashIndex = currentPath.lastIndexOf('/');
  const teacherName = lastSlashIndex !== -1 ? currentPath.slice(lastSlashIndex + 1) : '';
  teacher_name = teacherName;
console.log(teacher_name);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
   
    axios.get(`http://localhost:3000/courses/${teacher_name}`)
      .then(response => { setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [teacher_name]);
  const handleNavigate = () => {
    // Use navigate to navigate to another route
    navigate('/teacher/add'); // Replace with the desired route
  };
  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear any authentication tokens or user information in the state
    // Navigate to the specified logout page
    navigate('/'); // Replace '/logout' with the actual logout page path
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Button
            variant="outlined"
            style={{ position: 'absolute', top: 10, right: 10 }}
            onClick={handleLogout}
          >
            Logout
            </Button>
          <Typography variant="h4" gutterBottom>
            Teacher Id: {teacher_name}
          </Typography>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index} style={{ marginTop: '20px' }}>
                
                <StudentList courseName={course.c_id} />
              </div>
            ))
          ) : (
            <Typography variant="body1">No courses available for this teacher.</Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleNavigate}>
            Add course
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TeacherPage;