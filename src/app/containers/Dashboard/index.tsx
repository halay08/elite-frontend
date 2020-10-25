import React from 'react';
import { Container } from '@material-ui/core';
import { Information, Tabs } from 'app/components/Dashboard';

const Dashboard = () => {
  return (
    <Container>
      <Information />
      <Tabs />
    </Container>
  );
};

export { Dashboard };
