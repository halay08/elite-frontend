import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
} from '@material-ui/core';
import React from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import HorizonTimeline from './Timeline';
import { SlideProps } from '@material-ui/core/Slide';
import UserBar from './UserBar';
import { User } from 'types/User';

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

type dialogTimelineProps = {
  userData: User;
};
export default function DialogTimeline({
  userData,
}: dialogTimelineProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { timeline: timelineText } = translations;
  const [open, setOpen] = React.useState(true);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Dialog
      maxWidth="md"
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle className={classes.title}>
        {translator(timelineText.title)}
      </DialogTitle>
      <UserBar userData={userData} />
      <DialogContent>
        <DialogContentText>
          {translator(timelineText.content)}
        </DialogContentText>
        <HorizonTimeline userData={userData} />
      </DialogContent>
    </Dialog>
  );
}

const useStyles = makeStyles(theme => ({
  title: {
    textTransform: 'uppercase',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
  },
}));
