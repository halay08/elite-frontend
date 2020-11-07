import React, { ChangeEvent, useState, useCallback } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
  Menu,
} from '@material-ui/core';
import {
  LibraryBooks as LibraryBooksIcon,
  MoreHoriz as MoreHorizIcon,
  Report as ReportIcon,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Course as CourseType } from 'types/Course';

type HeaderType = {
  courses: Array<CourseType>;
  course: CourseType | undefined;
  handleChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => void;
};
export default function Header({
  courses,
  course,
  handleChange,
}: HeaderType): JSX.Element {
  const classes = useStyles();
  const [viewMore, setViewMore] = useState<null | SVGElement>(null);
  const { t: translator } = useTranslation();
  const { tutorCourse } = translations;

  const handleViewMore = useCallback((event: React.MouseEvent<SVGElement>) => {
    setViewMore(event.currentTarget);
  }, []);

  return (
    <Grid container alignItems="center" className={classes.container}>
      <Grid item xs={9} md={8} container alignItems="center">
        <LibraryBooksIcon />
        <Typography component="span" className={classes.label}>
          {translator(tutorCourse.selector.label)}
        </Typography>
        <Grid item xs={6} md={8}>
          <FormControl variant="outlined" fullWidth>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleChange}
              value={course ? course.id : 0}
            >
              <MenuItem value={0}>
                <em>{translator(tutorCourse.selector.defaultOption)}</em>
              </MenuItem>
              {courses.map(courseOption => (
                <MenuItem key={courseOption.id} value={courseOption.id}>
                  {courseOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={3} md={4}>
        <Typography component="span">
          {translator(tutorCourse.selector.price)}
          <Typography component="span" color="primary">
            {course ? course.totalCost : 0}
          </Typography>
        </Typography>
        <Tooltip title="more" className={classes.tooltip}>
          <MoreHorizIcon onClick={handleViewMore} />
        </Tooltip>

        <Menu
          anchorEl={viewMore}
          open={Boolean(viewMore)}
          onClose={() => setViewMore(null)}
        >
          <MenuItem>
            <ReportIcon className={classes.icon} />
            {translator(tutorCourse.report)}
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
  },
  label: {
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(1),
  },
  tooltip: {
    float: 'right',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));
