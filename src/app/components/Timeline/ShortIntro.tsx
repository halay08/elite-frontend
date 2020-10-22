import React from 'react';
import { makeStyles } from '@material-ui/core';
import { translations } from 'locales/i18n';
import CustomTextField from '../Profile/CustomTextField';
import { useForm } from 'react-hook-form';
import { User } from 'types/User';
import { useTranslation } from 'react-i18next';

type shortIntroProps = {
  userData: User;
};

export default function ShortIntro({ userData }: shortIntroProps): JSX.Element {
  const classes = useStyles();
  const { profile } = translations;
  const { t: translator } = useTranslation();
  const { register } = useForm({ defaultValues: userData });

  return (
    <CustomTextField
      className={classes.introduction}
      name="shortIntro"
      inputRef={register({
        required: `${translator(profile.requiredField)}`,
      })}
      multiline
      rows={6}
      inputProps={{ maxLength: 500 }}
      label={profile.about.description.label}
      placeholder={profile.about.description.placeholder}
    />
  );
}

const useStyles = makeStyles(theme => ({
  introduction: {
    marginBottom: theme.spacing(2),
  },
}));
