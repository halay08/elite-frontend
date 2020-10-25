import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Collapse,
  Fade,
  TextField,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { auth } from 'config/firebase';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Link } from 'react-router-dom';
import { getTranslatedError } from 'utils/helpers';

type FormData = {
  email: string;
};

export function ForgetPasswordForm() {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifySent, setIsVerifySent] = useState(false);

  const { register, handleSubmit, errors, getValues } = useForm();

  const { forgetPasswordForm: forgetPasswordFormTexts } = translations;

  const onSubmit = async (formData: FormData) => {
    const { email } = formData;
    setIsLoading(true);
    await auth
      .sendPasswordResetEmail(email)
      .then(function () {
        setIsVerifySent(true);
      })
      .catch(function (error) {
        setError(getTranslatedError(translator, error.message));
      });
    setIsLoading(false);
  };

  const showError = error.length ? true : false;

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid item md={4}>
        <div className={classes.form}>
          <Collapse in={!isVerifySent}>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  margin="normal"
                  placeholder={translator(
                    forgetPasswordFormTexts.emailInput.placeholder,
                  )}
                  type="email"
                  name="email"
                  fullWidth
                  inputRef={register({
                    required: `${translator(
                      forgetPasswordFormTexts.emailInput.requiredError,
                    )}`,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: `${translator(
                        forgetPasswordFormTexts.emailInput.invalidError,
                      )}`,
                    },
                  })}
                  error={errors.email && true}
                  helperText={errors.email ? errors.email.message : ''}
                />
                <Fade in={showError}>
                  <Typography color="error" className={classes.errorMessage}>
                    {error}
                  </Typography>
                </Fade>
                <div className={classes.creatingButtonContainer}>
                  {isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.submitButton}
                    >
                      {translator(forgetPasswordFormTexts.submit)}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </Collapse>
          <Collapse in={isVerifySent}>
            <Typography className={classes.verifyMessage}>
              {`${translator(
                forgetPasswordFormTexts.verifyNotice,
              )}  ${getValues('email')}`}
            </Typography>
          </Collapse>
          {!isVerifySent && (
            <Button
              component={Link}
              color="primary"
              size="large"
              className={classes.supportButton}
              to="/"
            >
              {translator(forgetPasswordFormTexts.support)}
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    height: 46,
    textTransform: 'none',
  },
  errorMessage: {
    textAlign: 'center',
    whiteSpace: 'break-spaces',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  verifyMessage: {
    textAlign: 'center',
    whiteSpace: 'break-spaces',
    color: theme.palette.success.main,
  },
  supportButton: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: theme.spacing(2),
    textTransform: 'none',
    fontWeight: 400,
    textAlign: 'center',
    width: '100%',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  form: {
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));
