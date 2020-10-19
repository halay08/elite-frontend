import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Collapse,
  Fade,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { USER_ROLES } from 'config/constants';
import { auth } from 'config/firebase';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { UserService } from 'services';

type UserData = {
  role: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifySent, setIsVerifySent] = useState(false);

  const { register, handleSubmit, errors, control, getValues } = useForm();

  const {
    registerForm: registerFormTexts,
    userRoles: userRolesTexts,
  } = translations;

  const sendEmailVerification = async () => {
    if (!auth.currentUser) return;
    await auth.currentUser.sendEmailVerification().then(function () {
      setIsVerifySent(true);
    });
  };

  const onSubmit = async (userData: UserData) => {
    const { email, password, role } = userData;
    setIsLoading(true);
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        if (user) {
          try {
            await UserService.signUp({
              role,
              email,
              uid: user.uid,
              createdAt: user.metadata.creationTime || '',
            });
            await sendEmailVerification();
            await auth.signOut();
          } catch (error) {
            setError(error.message);
          }
        }
      })
      .catch(function (error) {
        setError(error.message);
      });
    setIsLoading(false);
  };

  const showError = error.length ? true : false;

  return (
    <>
      <Typography variant="h1" className={classes.greeting}>
        {translator(registerFormTexts.welcome)}
      </Typography>
      <Collapse in={!isVerifySent}>
        <div>
          <Typography variant="h2" className={classes.subGreeting}>
            {translator(registerFormTexts.title)}
          </Typography>
          <Fade in={showError}>
            <Typography color="error" className={classes.errorMessage}>
              {error}
            </Typography>
          </Fade>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <InputLabel id="role-label">
                {translator(registerFormTexts.roleLabel)}
              </InputLabel>
              <Controller
                defaultValue={USER_ROLES.student}
                name="role"
                control={control}
                rules={{ required: true }}
                error={errors.role && true}
                as={
                  <Select
                    fullWidth
                    labelId="role-label"
                    input={
                      <Input
                        classes={{
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        }}
                      />
                    }
                  >
                    <MenuItem value={USER_ROLES.student}>
                      {translator(userRolesTexts.student)}
                    </MenuItem>
                    <MenuItem value={USER_ROLES.tutor}>
                      {translator(userRolesTexts.tutor)}
                    </MenuItem>
                  </Select>
                }
              />
            </div>
            <TextField
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              margin="normal"
              placeholder={translator(registerFormTexts.emailInput.placeholder)}
              type="email"
              name="email"
              fullWidth
              inputRef={register({
                required: `${translator(
                  registerFormTexts.emailInput.requiredError,
                )}`,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: `${translator(
                    registerFormTexts.emailInput.invalidError,
                  )}`,
                },
              })}
              error={errors.email && true}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
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
                  className={classes.createAccountButton}
                >
                  {translator(registerFormTexts.submit)}
                </Button>
              )}
            </div>
          </form>
        </div>
      </Collapse>
      <Collapse in={isVerifySent}>
        <Typography className={classes.verifyMessage}>
          {`${translator(registerFormTexts.verifyNotice)}  ${getValues(
            'email',
          )}`}
        </Typography>
      </Collapse>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  greeting: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(1),
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
    // borderBottomColor: theme.palette.background.light,
  },
}));
