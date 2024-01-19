import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

function StudentPage({ student_name }) {
  const currentPath = window.location.pathname;
  const location = useLocation();
  // Extract student_name from the path
  const lastSlashIndex = currentPath.lastIndexOf('/');
  const studentName = lastSlashIndex !== -1 ? currentPath.slice(lastSlashIndex + 1) : '';
  student_name = studentName;
  const receivedData = location.state;
  console.log(student_name);
  const roll_no=student_name;
  const [coursesData, setCoursesData] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [studentEnrollments, setStudentEnrollments] = useState([]);

  useEffect(() => {
    // Fetch all courses with their corresponding teacher names
    axios.get('http://localhost:3000/courses')
      .then(response => {
        console.log(response.data);
        setCoursesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses data:', error);
      });

    // Fetch all enrollments for the student
    axios.get(`http://localhost:3000/enrollments/student/${roll_no}`)
      .then(response => {
        console.log(response.data);
        setStudentEnrollments(response.data);
      })
      .catch(error => {
        console.error('Error fetching student enrollments:', error);
      });
  }, [student_name]);

  const handleEnroll = (c_id) => {
    // Perform the enrollment logic here
    // Make a POST request to enroll the student in the selected course
    axios.get(`http://localhost:3000/enrollments/enroll/${roll_no}/${c_id}`)
      .then(response => {
        console.log('Enrollment successful:', response.data);
        // Optionally, update the state to reflect the changes
        setStudentEnrollments([...studentEnrollments, { roll_no, course_name: c_id }]);
      })
      .catch(error => {
        console.error('Error enrolling student:', error);
      });
  };

  const isEnrolled = (courseName) => {
    // Check if the student is already enrolled in the given course
    return studentEnrollments.some(enrollment => enrollment.course_name === courseName);
  };

  const availableCourses = coursesData.filter(course => !isEnrolled(course.c_id));

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            studentDetails.name
          </Typography>

          <Typography variant="h5" gutterBottom>
            Enrollments:
          </Typography>

          {studentEnrollments.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Marks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentEnrollments.map((enrollment, index) => (
                    <TableRow key={index}>
                      <TableCell>{enrollment.course_name}</TableCell>
                      <TableCell>{enrollment.marks === "-1" ? "Not Assigned" : enrollment.marks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">No enrolled courses available.</Typography>
          )}

          <Typography variant="h5" gutterBottom>
            Available Courses:
          </Typography>

          {availableCourses.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {availableCourses.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell>{course.c_id}</TableCell>
                      <TableCell>{course.teacher_id}</TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => handleEnroll(course.c_id)}>
                          Enroll
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">No available courses.</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default StudentPage;