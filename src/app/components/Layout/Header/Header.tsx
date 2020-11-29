import React, { useState } from 'react';
import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { MoreVert as MoreIcon, Menu as MenuIcon } from '@material-ui/icons';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { drawerWidth } from '../constants';
import { Lang } from './Lang';
import { Messages } from './Messages';
import { Notifications } from './Notifications';

interface Props {
  children?: JSX.Element;
  mobileOpen: boolean;
  setMobileOpen: Function;
}

const mobileHeaderId = 'header-mobile';

const Header = (props: Props) => {
  const { mobileOpen, setMobileOpen } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { t: translator } = useTranslation();
  const translated = translations.header;

  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileHeaderId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Lang>
          <p>{translator(translated.lang)}</p>
        </Lang>
      </MenuItem>
      <MenuItem>
        <Messages>
          <p>{translator(translated.messange)}</p>
        </Messages>
      </MenuItem>
      <MenuItem>
        <Notifications>
          <p>{translator(translated.noti)}</p>
        </Notifications>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h4" noWrap className={classes.title}>
            <span style={{ color: theme.palette.primary.main }}>Elite</span>
            <span>Work</span>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Lang />
            <Messages />
            <Notifications />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              aria-controls={mobileHeaderId}
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: '100%',
      marginLeft: 0,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    title: {
      color: theme.palette.text.primary,
    },
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    sectionMobile: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

export { Header };
