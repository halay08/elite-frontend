import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Link, useLocation } from 'react-router-dom';
import isEmpty from 'ramda.isempty';
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Collapse,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { UserInfo } from './UserInfo';
import { items, SidebarItem } from './sidebarItems';
import { drawerWidth } from '../constants';

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  setMobileOpen: Function;
}

interface stateType {
  from: { pathname: string };
}

const Sidebar = (props: Props) => {
  const { window, mobileOpen, setMobileOpen } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { pathname = '' } = useLocation<stateType>();
  const { t: translator } = useTranslation();
  const itemsTexts = translations.sidebar.items;

  const [expanded, setExpanded] = useState({});

  const isActiveItem = (routeName: string) => {
    return pathname.indexOf(routeName) !== -1;
  };

  const handleExpandItem = (index: number) => {
    setExpanded({
      ...expanded,
      [index]: !expanded[index],
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderExpander = (item: SidebarItem, index: number) => {
    if (isEmpty(item.subItems)) return '';

    return expanded[index] ? <ExpandLess /> : <ExpandMore />;
  };

  const renderParentItem = (
    item: SidebarItem,
    index: number,
    isMobile: boolean,
  ) => {
    const props = isEmpty(item.subItems)
      ? { component: Link, to: item.link }
      : { onClick: () => handleExpandItem(index) };

    return (
      <ListItem
        button
        key={`${isMobile ? 'mobile-' : ''}sidebar-${item.itemKey}`}
        classes={{
          container: classes.sidebarItem,
          root: classes.sidebarItemRoot,
        }}
        selected={isActiveItem(item.link)}
        {...props}
      >
        <ListItemIcon className={classes.sidebarIcon}>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={translator(itemsTexts[item.itemKey])} />
        {renderExpander(item, index)}
      </ListItem>
    );
  };

  const renderItem = (item: SidebarItem, index: number, isMobile: boolean) => {
    if (isEmpty(item.subItems)) {
      return renderParentItem(item, index, isMobile);
    }

    return (
      <>
        {renderParentItem(item, index, isMobile)}
        <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem, index) => (
              <ListItem
                button
                className={classes.nested}
                key={`${isMobile ? 'mobile-' : ''}sidebar-${item.itemKey}-${
                  subItem.itemKey
                }`}
                classes={{
                  container: classes.sidebarItem,
                  root: classes.sidebarItemRoot,
                }}
                component={Link}
                to={subItem.link}
                selected={isActiveItem(subItem.link)}
              >
                <ListItemText
                  primary={translator(itemsTexts[subItem.itemKey])}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  const drawer = (isMobile: boolean) => (
    <div>
      <UserInfo />
      <List>
        {items.map((item, index) => (
          <>{renderItem(item, index, isMobile)}</>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="js">
        <Drawer
          container={
            window !== undefined ? () => window().document.body : undefined
          }
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer(true)}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="js">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer(false)}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 0,
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    sidebarItem: {
      color: theme.palette.mainSidebarText.main,

      '&:hover, &:focus, & .MuiListItem-root.Mui-selected': {
        color: theme.palette.mainSidebarTextHover.main,
        backgroundColor: 'transparent !important',

        '& $sidebarIcon': {
          color: theme.palette.mainSidebarTextHover.main,
        },
        '& $sidebarButton': {
          color: `${theme.palette.mainSidebarTextHover.main} !important`,
        },
        '& $sidebarItemRoot': {
          backgroundColor: 'transparent !important',
        },
      },
    },
    sidebarItemRoot: {
      color: theme.palette.mainSidebarText.main,

      '&:hover, &:focus, &.MuiListItem-root.Mui-selected': {
        color: theme.palette.mainSidebarTextHover.main,
        backgroundColor: 'transparent !important',

        '& $sidebarIcon': {
          color: theme.palette.mainSidebarTextHover.main,
        },
        '& $sidebarButton': {
          color: `${theme.palette.mainSidebarTextHover.main} !important`,
        },
      },
    },
    sidebarIcon: {
      color: theme.palette.mainSidebarText.main,
    },
    sidebarButton: {
      color: theme.palette.mainSidebarText.main,
    },
    nested: {
      paddingLeft: theme.spacing(8),
    },
  }),
);

export { Sidebar };
