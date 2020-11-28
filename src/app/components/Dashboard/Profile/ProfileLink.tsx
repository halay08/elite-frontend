import React from 'react';
import { Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { StudentRouteConfig } from 'config/routes';

const ProfileLink = () => {
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.profile;

  return (
    <Box
      mt={2}
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Link component={RouterLink} to={StudentRouteConfig.account.setting}>
        {translator(translatedTexts.link)}
      </Link>
    </Box>
  );
};

export default ProfileLink;
