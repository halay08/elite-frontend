import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import Calendar from '../Calendar';
import { Course as CourseType } from 'types/Course';
import { useMount } from 'ahooks';
import courseService from 'services/courseService';
import Header from './Header';
import moment, { Moment } from 'moment';
import HeaderBar from '../HeaderBar';
import CalendarIcon from './CalendarIcon';
import ControllBar from './ControllBar';

function Course(): JSX.Element {
  const { t: translator } = useTranslation();
  const { tutorCourse } = translations;
  const [courses, setCourses] = useState<Array<CourseType>>([]);
  const [selectedCourse, setSelectedCourse] = useState<
    CourseType | undefined
  >();
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  useMount(async () => {
    const allCourse = await courseService.getAll();
    setCourses(allCourse);
  });

  const handleChangeCourse = useCallback(
    async (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
    ) => {
      const currentCourse = courses.find(
        course => course.id === Number(event.target.value),
      );
      setSelectedCourse(currentCourse);
    },
    [courses],
  );

  const handleChangeWeek = useCallback(
    async (newSelectedDate: Moment) => setSelectedDate(newSelectedDate),
    [],
  );

  return (
    <>
      <Header
        courses={courses}
        course={selectedCourse}
        handleChange={handleChangeCourse}
      />
      <HeaderBar
        title={translator(tutorCourse.bar.title)}
        subTitle={translator(tutorCourse.bar.subTitle, {
          courseLength: selectedCourse ? selectedCourse.sessions.length : 0,
        })}
        Icon={<CalendarIcon />}
      />
      <ControllBar handleChangeWeek={handleChangeWeek} />
      <Calendar selectedCourse={selectedCourse} selectedDate={selectedDate} />
    </>
  );
}

export default Course;
