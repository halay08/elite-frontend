import React from 'react';
import activitiesData, { Activity } from './mocks';
import { useRequest } from 'ahooks';
import isEmpty from 'ramda.isempty';
import DashboadCard from 'app/components/Dashboard/DashboardCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import Item from './Item';
import ViewAllLink from './ViewAllLink';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

function getActivities(): Promise<Activity[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(activitiesData);
    }, 2000);
  });
}

const Activities = () => {
  const { data, loading } = useRequest(getActivities);
  const activities = data || [];
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.activities;

  const getContent = () => {
    if (loading) return <CircularProgress color="primary" />;

    if (isEmpty(activities))
      return <Box component="p">{translator(translatedTexts.empty)}</Box>;

    return (
      <Box>
        <Box>
          {activities.map(activity => {
            return <Item activity={activity} key={activity.id} />;
          })}
        </Box>
        <ViewAllLink />
      </Box>
    );
  };

  return (
    <DashboadCard title={translator(translatedTexts.header)}>
      {getContent()}
    </DashboadCard>
  );
};

export { Activities };
