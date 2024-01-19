import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Hello from './components/Hello';
import Message from './components/Message';
import Login from './components/Login';
//import Profile from './components/Profile';
import Create from './components/Create';
import Adhome from './components/Adhome';
import Student from './components/Student';
import Userslogin from './components/Userslogin';
import StudentPage from './components/StudentPage';
import TeacherPage from './components/TeacherPage';

import Add from './components/Add';
import userHome from './components/userHome';
function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Userslogin/>} />
        <Route path="/admin" element={<Login />} />
        <Route path="/home" element={<Adhome/>} />
        <Route path="/student/:roll_no" element={<StudentPage/>} />
        <Route path="/teacher/:teacher_name" element={<TeacherPage/>} />
        <Route path="/teacher/add/" element={<Add/>} />
      </Routes>
    </Router>
  );
}

export default App;
