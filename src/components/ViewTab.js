import React from 'react';
import { Button, Typography } from '@mui/material';

const ViewTab = ({ selectedOption, onSelectOption, onSubmit }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#2196F3' }}>
          Manage Users
        </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          variant={selectedOption === 'option1' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => onSelectOption('option1')}
          style={{ margin: '5px' }}
        >
          Teacher
        </Button>

        <Button
          variant={selectedOption === 'option2' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => onSelectOption('option2')}
          style={{ margin: '5px' }}
        >
          Student
        </Button>
      </div>

      <Button variant="contained" color="primary" onClick={onSubmit} style={{ marginTop: '20px' }}>
        Submit
      </Button>
    </div>
  );
};

export default ViewTab;
