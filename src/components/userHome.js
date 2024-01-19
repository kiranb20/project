// UserHome.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeacherPage from './TeacherPage';
import Add from './Add';
import { AppBar, Drawer, List, ListItem, ListItemText, Typography, Container } from '@mui/material';

const UserHome = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 40,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 40,
              boxSizing: 'border-box',
              backgroundColor: '#333',
            },
          }}
        >
          <List>
            <ListItem button onClick={() => handleOptionClick('viewMarks')}>
              <ListItemText>
                <Link to="/viewMarks" style={{ textDecoration: 'none', color: 'white' }}>
                  V
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => handleOptionClick('addCourse')}>
              <ListItemText>
                <Link to="/addCourse" style={{ textDecoration: 'none', color: 'white' }}>
                  A
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>

        {/* Content */}
        <Container>
          <Routes>
            <Route path="/viewMarks" element={<TeacherPage />} />
            <Route path="/addCourse" element={<Add />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default UserHome;
