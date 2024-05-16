import React from 'react';
import { Typography, Container } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" gutterBottom>Welcome to the Dashboard</Typography>
      {/* Add dashboard content here */}
    </Container>
  );
};

export default DashboardPage;
