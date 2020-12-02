import React, { useCallback, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Tutor } from 'types/Tutor';
import Course from './Course';
import VideoIntro from './VideoIntro';
import Sidebar from './Sidebar';
import ReviewBlock from './Review';
import Policies from './Policies';
import { Course as CourseType } from 'types/Course';
import CalendarBlock from './CalendarBlock/CalendarBlock';
import { useMount } from 'ahooks';
import courseService from 'services/courseService';

type TutorProfileType = {
  tutor: Tutor;
};
function TutorProfile({ tutor }: TutorProfileType): JSX.Element {
  const [course, setCourse] = useState<CourseType | undefined>();
  const [courses, setCourses] = useState<Array<CourseType>>([]);

  useMount(async () => {
    const allCourse = await courseService.getAll();
    setCourses(allCourse);
    if (allCourse.length) {
      setCourse(allCourse[0]);
    }
  });

  const handleChangeCourse = useCallback(
    async (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
    ) => {
      const currentCourse = courses.find(
        course => course.id === Number(event.target.value),
      );
      setCourse(currentCourse);
    },
    [courses],
  );

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12} sm={12} md={8}>
        <VideoIntro tutor={tutor} />
        <Course
          courses={courses}
          course={course}
          handleChange={handleChangeCourse}
        />
        <CalendarBlock course={course} setCourse={setCourse} />
        <Policies course={course} />
        <ReviewBlock />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Sidebar tutor={tutor} />
      </Grid>
    </Grid>
  );
}

export default TutorProfile;
