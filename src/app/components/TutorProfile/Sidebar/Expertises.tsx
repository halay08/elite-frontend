import React, { useMemo } from 'react';
import {
  Grid,
  makeStyles,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
  Work as WorkIcon,
  School as SchoolIcon,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Tutor } from 'types/Tutor';
import Title from './Title';
import { useToggle } from 'ahooks';

type ExpertisesType = {
  tutor: Tutor;
};
function Expertises({ tutor }: ExpertisesType): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { expertises } = translations.tutorSidebar;
  const [workCollapse, { toggle: toggleWork }] = useToggle(true);
  const [educationCollapse, { toggle: toggleEducation }] = useToggle(true);

  const educationContent = useMemo(
    () =>
      tutor.educations.reduce((content, education) => {
        const {
          school_name: name,
          start_date: startDate,
          end_date: endDate,
          is_present_learning: isLearning,
        } = education;

        content += `${startDate.getFullYear()}-${
          isLearning ? 'now' : endDate.getFullYear()
        }: ${name}\n`;
        return content;
      }, ''),
    [tutor],
  );

  const workContent = useMemo(
    () =>
      tutor.expertises.reduce((content, expertise) => {
        content += `${expertise.name} - ${expertise.level}\n`;
        return content;
      }, ''),
    [tutor],
  );

  return (
    <Grid item className={classes.marginTop}>
      <Grid item xs={12} sm={12} md={12}>
        <Title
          title={translator(expertises.title)}
          subTitle={translator(expertises.subTitle)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} className={classes.container}>
        <Grid item container direction="row">
          <ListItem
            onClick={() => toggleWork()}
            className={classes.collapseTitle}
          >
            <WorkIcon className={classes.icon} />
            <ListItemText primary={translator(expertises.work)} />
            {workCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={workCollapse}
            timeout={300}
            unmountOnExit
            className={classes.collapse}
          >
            <Typography component="p" className={classes.breakLine}>
              {workContent}
            </Typography>
          </Collapse>
        </Grid>
        <Grid item container direction="row">
          <ListItem
            onClick={() => toggleEducation()}
            className={classes.collapseTitle}
          >
            <SchoolIcon className={classes.icon} />
            <ListItemText primary={translator(expertises.education)} />
            {educationCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={educationCollapse}
            timeout={300}
            unmountOnExit
            className={classes.collapse}
          >
            <Typography component="p" className={classes.breakLine}>
              {educationContent}
            </Typography>
          </Collapse>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Expertises;

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(3),
  },
  container: {
    padding: theme.spacing(1.5),
    paddingTop: 0,
    border: `1px solid ${theme.palette.background.dark}`,
    backgroundColor: theme.palette.background.white,
  },
  collapseTitle: {
    borderBottom: `1px solid ${theme.brand}`,
    paddingLeft: 0,
    marginBottom: theme.spacing(2),
  },
  collapse: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  breakLine: {
    whiteSpace: 'pre',
  },
}));
