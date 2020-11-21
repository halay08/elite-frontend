import {
  makeStyles,
  withStyles,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import React, { ChangeEvent } from 'react';
import { generateFontSize } from 'styles/theme';

type CustomSelectProps = {
  name: string;
  onChange?: (e: ChangeEvent<{ value: unknown }>) => void;
  options?: any;
  optionalOptions?: Array<string | number>;
  label: string;
};
function CustomSelect({
  name,
  onChange = () => {},
  options = [],
  optionalOptions = [],
  label,
}: CustomSelectProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const optionKeys = Object.keys(options || {});

  return (
    <>
      <Typography component="span" variant="body2" className={classes.label}>
        {label}
      </Typography>
      <StyledSelect variant="outlined" onChange={onChange} defaultValue="0">
        {optionKeys.map((key, index) => (
          <MenuItem key={index} value={key}>
            {translator(options[key])}
          </MenuItem>
        ))}
        {optionalOptions.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </StyledSelect>
    </>
  );
}

export default CustomSelect;

const useStyles = makeStyles(theme => ({
  label: {
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(3.5),
  },
}));

const StyledSelect = withStyles({
  root: {
    '&&&': {
      padding: '8px 36px 8px 12px',
      ...generateFontSize(9, 12, 14),
    },
  },
})(Select);
