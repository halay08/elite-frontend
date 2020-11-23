import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import Calendar from '../Calendar';
import { Course } from 'types/Course';
import moment, { Moment } from 'moment';
import HeaderBar from '../HeaderBar';
import CalendarIcon from './CalendarIcon';
import ControllBar from './ControllBar';
import { hideIfNoData } from 'helpers';

type CalendarBlockType = {
  course: Course;
};
const checkProps = hideIfNoData(({ course }: CalendarBlockType) => !course);
function CalendarBlock({ course }: CalendarBlockType): JSX.Element {
  const { t: translator } = useTranslation();
  const { tutorCourse } = translations;
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  const handleChangeWeek = useCallback(
    async (newSelectedDate: Moment) => setSelectedDate(newSelectedDate),
    [],
  );

  return (
    <>
      <HeaderBar
        title={translator(tutorCourse.bar.title)}
        subTitle={translator(tutorCourse.bar.subTitle, {
          courseLength: course ? course.sessions.length : 0,
        })}
        Icon={<CalendarIcon />}
      />
      <ControllBar handleChangeWeek={handleChangeWeek} />
      <Calendar selectedCourse={course} selectedDate={selectedDate} />
    </>
  );
}

export default checkProps(CalendarBlock);
