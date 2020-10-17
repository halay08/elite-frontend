/* eslint-disable */
import {
  Button,
  CircularProgress,
  Fade,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { auth, firebase } from 'config/firebase';
import * as firebaseui from 'firebaseui';
import { lazyLoad } from 'utils/loadable';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

type LoginData = {
  email: string;
  password: string;
};

export const Greeting = lazyLoad(
  () => import('./Greeting'),
  module => module.default,
);

export default function LoginForm() {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { loginForm: loginFormTexts } = translations;

  useEffect(() => {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
    };
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  async function onSubmit(loginData: LoginData) {
    const { email, password } = loginData;
    setIsLoading(true);

    await auth.signInWithEmailAndPassword(email, password).catch(err => {
      setErrorMsg(err.message);
    });

    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <Greeting variant="h1" />
      <div id="firebaseui-auth-container" />
      <div className={classes.formDividerContainer}>
        <div className={classes.formDivider} />
        <Typography className={classes.formDividerWord}>
          {translator(loginFormTexts.or)}
        </Typography>
        <div className={classes.formDivider} />
      </div>
      <Fade in={Boolean(errorMsg)}>
        <Typography color="secondary" className={classes.errorMessage}>
          {errorMsg}
        </Typography>
      </Fade>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="email"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          margin="normal"
          placeholder={translator(loginFormTexts.emailInput.placeholder)}
          type="email"
          fullWidth
          inputRef={register({
            required: `${translator(loginFormTexts.emailInput.requiredError)}`,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: `${translator(loginFormTexts.emailInput.invalidError)}`,
            },
          })}
          error={errors.email && true}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          name="password"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          margin="normal"
          placeholder={translator(loginFormTexts.passwordInput.placeholder)}
          type="password"
          fullWidth
          inputRef={register({
            required: `${translator(
              loginFormTexts.passwordInput.requiredError,
            )}`,
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i,
              message: `${translator(
                loginFormTexts.passwordInput.invalidError,
              )}`,
            },
          })}
          error={errors.password && true}
          helperText={errors.password ? errors.password.message : ''}
        />
        <div className={classes.formButtons}>
          {isLoading ? (
            <CircularProgress size={26} className={classes.loginLoader} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              {translator(loginFormTexts.submit)}
            </Button>
          )}
          <Button color="primary" size="large" className={classes.forgetButton}>
            {translator(loginFormTexts.forgotPassword)}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  googleButton: {
    marginTop: theme.spacing(6),
    boxShadow: theme.customShadows.widget,
    backgroundColor: 'white',
    width: '100%',
    textTransform: 'none',
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButton: {
    height: 46,
    textTransform: 'none',
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + '40',
  },
  errorMessage: {
    textAlign: 'center',
  },
  textFieldUnderline: {
    '&:before': {
      borderBottomColor: theme.palette.primary.light,
    },
    '&:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '&:hover:before': {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    width: '100%',
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgetButton: {
    textTransform: 'none',
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
}));
