import React from 'react';
import DashboadCard from 'app/components/Dashboard/DashboardCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { User, mockUser, initUser } from 'types/User';
import Timeline from './Timeline';
import Info from './Info';
import Sessions from './Sessions';
import ProfileLink from './ProfileLink';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import isEmpty from 'ramda.isempty';
import { useRequest } from 'ahooks';

function getUser(): Promise<User> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockUser);
    }, 1000);
  });
}

const Profile = () => {
  const { data, loading } = useRequest(getUser);
  const user = data || initUser;
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.profile;

  if (isEmpty(user)) return <></>;

  const getContent = () => {
    if (loading) return <CircularProgress color="primary" />;
    return (
      <>
        <Info user={user} />
        <Timeline value={user.profileCompleted} />
        <Sessions sessions={user.sessions} />
        <ProfileLink />
      </>
    );
  };

  return (
    <DashboadCard title={translator(translatedTexts.header)}>
      {getContent()}
    </DashboadCard>
  );
};

export { Profile };
