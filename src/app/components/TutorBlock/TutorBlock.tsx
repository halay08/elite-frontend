import React, { useState, useEffect } from 'react';
import ToptipBanner from './ToptipBanner';
import RecommendBar from './RecommendBar';
import { Tutor } from 'types/Tutor';
import { TutorService } from 'services';
import TutorThumbnail from './TutorThumbnail';
import { translations } from 'locales/i18n';
import { Grid } from '@material-ui/core';

export default function TutorBlock(): JSX.Element {
  const { recommendedBar, availableBar } = translations;
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [barText, setBarText] = useState<object>(recommendedBar);

  useEffect(() => {
    (async () => {
      const recommendedTutors = await TutorService.getRecommendedTutors();
      setTutors(recommendedTutors);
    })();
  }, []);

  const getOnlineTutors = async () => {
    const onlineTutors = await TutorService.getOnlineTutors();
    setTutors(onlineTutors);
    setBarText(availableBar);
  };

  const getAll = async () => {
    const allTutors = await TutorService.getAllTutors();
    setTutors(allTutors);
    setBarText(availableBar);
  };

  return (
    <>
      <ToptipBanner handleGetAll={getAll} />
      <RecommendBar
        tutors={tutors}
        text={barText}
        handleGetOnline={getOnlineTutors}
      />
      <Grid container direction="row" spacing={3}>
        {tutors.map((tutor, index) => (
          <Grid key={index} item xs={4}>
            <TutorThumbnail tutor={tutor} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
