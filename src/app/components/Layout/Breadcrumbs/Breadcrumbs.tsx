import React, { useMemo } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link, { LinkProps } from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route } from 'react-router';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { UniversalRouteConfig, StudentRouteConfig } from 'config/routes';
import pathOr from 'ramda.pathor';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

export function RouterBreadcrumbs() {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translated = translations.sidebar.items;

  const homeMatches = useRouteMatch(UniversalRouteConfig.home);
  const dashboardMatches = useRouteMatch(UniversalRouteConfig.dashboard);
  const tutorsMatches = useRouteMatch(UniversalRouteConfig.tutor.list);
  const tutorMatches = useRouteMatch(UniversalRouteConfig.tutor.profile);
  const calendarMatches = useRouteMatch(UniversalRouteConfig.calendar);
  const accountMatches = useRouteMatch(StudentRouteConfig.account.main);
  const accountSettingsMatches = useRouteMatch(
    StudentRouteConfig.account.setting,
  );

  const links = useMemo(
    () => [
      {
        matcher: homeMatches,
        to: pathOr('', ['url'], homeMatches),
        key: 'home',
      },
      {
        matcher: dashboardMatches,
        to: pathOr('', ['url'], dashboardMatches),
        key: 'dashboard',
      },
      {
        matcher: tutorsMatches,
        to: pathOr('', ['url'], tutorsMatches),
        key: 'tutors',
      },
      {
        matcher: tutorMatches,
        to: pathOr('', ['url'], tutorMatches),
        key: `${pathOr('', ['params', 'slug'], tutorMatches)}`,
      },
      {
        matcher: calendarMatches,
        to: pathOr('', ['url'], calendarMatches),
        key: 'calendar',
      },
      { matcher: accountMatches, to: '', key: 'account' },
      {
        matcher: accountSettingsMatches,
        to: pathOr('', ['url'], accountSettingsMatches),
        key: 'accountSettings',
      },
    ],
    [
      accountMatches,
      accountSettingsMatches,
      calendarMatches,
      dashboardMatches,
      homeMatches,
      tutorMatches,
      tutorsMatches,
    ],
  );

  return (
    <div className={classes.root}>
      <Route>
        {() => {
          return (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              {links.map(link => {
                if (!link.matcher) return '';
                const text = translator(translated[link.key]) || link.key;
                if (link.to) {
                  return (
                    <LinkRouter color="inherit" to={link.to}>
                      {text}
                    </LinkRouter>
                  );
                }
                return <Typography color="inherit">{text}</Typography>;
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(2),

      '& a': {
        '&:hover': {
          textDecoration: 'none',
          color: theme.palette.primary.main,
        },
      },
    },
    lastLink: {
      color: theme.palette.primary.main,
    },
  }),
);
