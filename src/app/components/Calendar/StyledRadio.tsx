import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';

const StyledRadio = withStyles(theme => ({
  root: {
    '&$checked': {
      color: theme.palette.primary.main,
    },
  },
  checked: {},
}))((props: RadioProps) => <Radio size="small" color="default" {...props} />);

export default StyledRadio;
