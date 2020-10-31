import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
} from '@material-ui/core';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import VerifyPhoneNumber from './VerifyPhone';
import UpdateInformation from './Information';
import ShortIntro from './ShortIntro';
import TrialBooking from './TrialBooking';
import { User } from 'types/User';
import AvatarUploadder from './AvatarUploadder';

type buttonProps = {
  optional?: ReactNode;
};

type stepProps = {
  completed?: boolean;
};

const { timeline } = translations;

const steps = [
  timeline.step.verifyNumber,
  timeline.step.uploadAvatar,
  timeline.step.updateInfor,
  timeline.step.shortIntro,
  timeline.step.bookingTrial,
];

const optionalStep = [1, 4];

type stepContentProps = {
  step: number;
  userData: User;
};
function StepContent({ step, userData }: stepContentProps): JSX.Element {
  switch (step) {
    case 0:
      return <VerifyPhoneNumber />;
    case 1:
      return <AvatarUploadder userData={userData} />;
    case 2:
      return <UpdateInformation userData={userData} />;
    case 3:
      return <ShortIntro userData={userData} />;
    case 4:
      return <TrialBooking />;
    default:
      return <div />;
  }
}

export default function HorizontalTimeline({ userData }): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const totalSteps = steps.length;

  const isStepOptional = (step: number): boolean => {
    return optionalStep.includes(step);
  };

  const handleSkip = (): void => {
    if (!isStepOptional(activeStep)) {
      throw new Error(translator(timeline.step.skipError));
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const allStepsCompleted = (): boolean => {
    return completed.size === totalSteps - skipped.size;
  };

  const isLastStep = (): boolean => {
    return activeStep === totalSteps - 1;
  };

  const handleNext = (): void => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = (): void => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step: number): any => () => {
    setActiveStep(step);
  };

  const handleComplete = (): void => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    if (!allStepsCompleted()) {
      handleNext();
    }
  };

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const isStepComplete = (step: number): boolean => {
    return completed.has(step);
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: stepProps = {};
          const buttonProps: buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = (
              <Typography variant="caption">
                {translator(timeline.step.optional)}
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {translator(label)}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <StepContent step={activeStep} userData={userData} />
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
          >
            {translator(timeline.backButton)}
          </Button>
          {isStepOptional(activeStep) && !completed.has(activeStep) && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSkip}
              className={classes.button}
            >
              {translator(timeline.skipButton)}
            </Button>
          )}
          {activeStep !== steps.length && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleComplete}
            >
              {translator(
                completed.size === totalSteps - 1
                  ? timeline.finishButton
                  : timeline.nextButton,
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
