import React, { useState } from 'react';
import {
  makeStyles,
  Container,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
  Grid,
} from '@material-ui/core';
import { auth } from 'config/firebase';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useForm } from 'react-hook-form';
import { Success } from './Success';
import { getTranslatedError } from 'utils/helpers';

type Props = {
  actionCode: string;
  email: string;
};

type FormData = {
  password: string;
};

export function Form({ actionCode, email }: Props) {
  const classes = useStyles();
  const { t: translator } = useTranslation();

  const {
    resetPassword: translatedTexts,
    registerForm: registerFormTexts,
  } = translations;

  const { register, handleSubmit, errors } = useForm();

  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: FormData) => {
    const { password } = formData;
    setIsLoading(true);
    await auth.confirmPasswordReset(actionCode, password).then(
      () => {
        setIsSuccess(true);
      },
      error => {
        setIsSuccess(false);
        setError(getTranslatedError(translator, error.message));
      },
    );
    setIsLoading(false);
  };

  const showError = error.length ? true : false;

  return isSuccess ? (
    <Success />
  ) : (
    <Container>
      <Typography variant="h3" className={classes.title}>
        {`${translator(translatedTexts.title)} ${email}`}
      </Typography>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item md={4}>
          <div className={classes.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                placeholder={translator(
                  registerFormTexts.passwordInput.placeholder,
                )}
                type="password"
                name="password"
                fullWidth
                inputRef={register({
                  required: `${translator(
                    registerFormTexts.passwordInput.requiredError,
                  )}`,
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i,
                    message: `${translator(
                      registerFormTexts.passwordInput.invalidError,
                    )}`,
                  },
                })}
                error={errors.password && true}
                helperText={errors.password ? errors.password.message : ''}
              />
              <Fade in={showError}>
                <Typography color="error" className={classes.errorMessage}>
                  {error}
                </Typography>
              </Fade>
              <div className={classes.buttonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                  >
                    {translator(translatedTexts.save)}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  buttonContainer: {
    marginTop: theme.spacing(2.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 46,
    textTransform: 'none',
  },
  errorMessage: {
    textAlign: 'center',
    whiteSpace: 'break-spaces',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  form: {
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));
