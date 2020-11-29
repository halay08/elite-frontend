import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { Profile } from 'app/components/Dashboard/Profile';

const Dashboard = () => {
  return (
    <Box pt={{ xl: 4 }} clone>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} xl={3}>
          <Profile />
        </Grid>
        <Grid item xs={12} md={8} xl={9}></Grid>
      </Grid>
    </Box>
  );
};

export { Dashboard };
