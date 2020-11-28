import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { Profile, Activities } from 'app/components/Dashboard';

const Dashboard = () => {
  return (
    <>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} xl={3}>
            <Profile />
          </Grid>
          <Grid item xs={12} md={8} xl={9}></Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} xl={9}></Grid>
          <Grid item xs={12} md={4} xl={3}>
            <Activities />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { Dashboard };
