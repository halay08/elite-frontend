import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Feedback as FeedbackIcon } from '@material-ui/icons';
import HeaderBar from '../HeaderBar';
import SummaryBar from './SumaryBar';
import SortBar from './SortBar';
import FeedbackBlock from './FeedbackBlock';
import { Button, makeStyles } from '@material-ui/core';

function ReviewBlock(): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { tutorReview } = translations;
  const [reviewList, setReviewList] = useState<any[]>([]);
  useEffect(() => {
    setReviewList(Array(4).fill(0));
  }, []);

  const handleLoadmore = (): void => {
    setReviewList(Array(8).fill(0));
  };

  return (
    <>
      <HeaderBar
        title={translator(tutorReview.title)}
        subTitle={translator(tutorReview.subTitle)}
        Icon={<FeedbackIcon style={{ fontSize: '4rem' }} />}
      />
      <SummaryBar />
      <SortBar />
      {reviewList.map((e, index) => (
        <FeedbackBlock key={index} />
      ))}
      <Button
        color="primary"
        className={classes.loadMore}
        onClick={handleLoadmore}
      >
        Load more +
      </Button>
    </>
  );
}

export default ReviewBlock;

const useStyles = makeStyles(theme => ({
  loadMore: {
    marginLeft: '50%',
    marginTop: theme.spacing(3),
    textTransform: 'none',
  },
}));
