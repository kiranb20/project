import React, { useState } from 'react';
import {
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import ViewTab from './ViewTab';
import Create from './Create';

const Adhome = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [viewSelectedOption, setViewSelectedOption] = useState('');
  const [response, setResponse] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setResponse(null); // Reset response when switching tabs
  };

  const handleViewSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option: viewSelectedOption }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateClick = async(rowData,role) => {
    const requestData = { ...rowData, role };

    try {
      const response = await fetch('http://localhost:3000/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      console.log(rowData);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResponse(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('Updating data:', rowData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Paper elevation={5} style={{ padding: '20px', width: '80%', maxWidth: '800px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant={activeTab === 'view' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleTabClick('view')}
            style={{ width: '48%' }}
          >
            View
          </Button>
          <Button
            variant={activeTab === 'create' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleTabClick('create')}
            style={{ width: '48%' }}
          >
            Create
          </Button>
        </div>

        {activeTab === 'view' && (
          <ViewTab
            selectedOption={viewSelectedOption}
            onSelectOption={(option) => setViewSelectedOption(option)}
            onSubmit={handleViewSubmit}
          />
        )}

        {activeTab === 'create' && <Create />}

        {response?.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#333' }}>
              Users Data
            </Typography>
            
                    <TableContainer
                      component={Paper}
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{
                                width: '20%',
                                fontWeight: 'bold',
                                background: '#2196F3',
                                color: '#fff',
                                padding: '8px',
                                fontSize: '16px',
                                margin: '2px',
                              }}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              style={{
                                width: '20%',
                                fontWeight: 'bold',
                                background: '#2196F3',
                                color: '#fff',
                                padding: '8px',
                                fontSize: '16px',
                                margin: '2px',
                              }}
                            >
                              Username
                            </TableCell>
                            <TableCell
                              style={{
                                width: '20%',
                                fontWeight: 'bold',
                                background: '#2196F3',
                                color: '#fff',
                                padding: '8px',
                                fontSize: '16px',
                                margin: '2px',
                              }}
                            >
                              Password
                            </TableCell>
                            <TableCell
                              style={{
                                width: '20%',
                                fontWeight: 'bold',
                                background: '#2196F3',
                                color: '#fff',
                                padding: '8px',
                                fontSize: '16px',
                                margin: '2px',
                              }}
                            >
                              Roll NO/EMP ID
                            </TableCell>
                            <TableCell
                              style={{
                                width: '20%',
                                fontWeight: 'bold',
                                background: '#2196F3',
                                color: '#fff',
                                padding: '8px',
                                fontSize: '16px',
                                margin: '2px',
                              }}
                            >
                              Update
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {response.map((item) => (
                            <TableRow key={item.id} style={{ backgroundColor: '#E3F2FD' }}>
                              <TableCell>
                              <TextField
                                  value={item.name}
                                  onChange={(e) => (item.name = e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  value={item.email}
                                  onChange={(e) => (item.email = e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                
                                <TextField
                                  value={item.password}
                                  onChange={(e) => (item.password = e.target.value)}
                                />
                              </TableCell>
                              <TableCell>{item.emp_id ? item.emp_id : item.roll_no}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleUpdateClick(item,item.emp_id ? "teacher" : "student")}
                                >
                                  Update
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  
          </div>
        ) }
      </Paper>
    </div>
  );
};

export default Adhome;
