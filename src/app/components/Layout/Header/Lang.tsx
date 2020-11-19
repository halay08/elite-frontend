import React from 'react';
import { IconButton, Box } from '@material-ui/core';
import { IconFlagUS } from 'material-ui-flags';

interface Props {
  children?: JSX.Element;
}

const Lang = ({ children }: Props) => {
  return (
    <>
      <IconButton>
        <IconFlagUS />
        {children && (
          <Box ml={2} fontSize={16} component="span">
            {children}
          </Box>
        )}
      </IconButton>
    </>
  );
};

export { Lang };
