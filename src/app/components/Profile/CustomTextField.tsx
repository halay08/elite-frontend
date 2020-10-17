import { TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CustomTextField(props) {
  const { label = '', placeholder = '' } = props;
  const { t: translator } = useTranslation();

  return (
    <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      {...props}
      label={translator(label)}
      placeholder={translator(placeholder)}
    />
  );
}
