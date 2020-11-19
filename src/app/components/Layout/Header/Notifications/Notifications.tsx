import React, { useMemo } from 'react';
import {
  IconButton,
  Badge,
  Popover,
  Box,
  Button,
  List,
} from '@material-ui/core';
import { NotificationsActive as NotificationsActiveIcon } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NotificationItem } from './Item';
import notificationData from './mocks';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useToggle } from 'ahooks';

interface Props {
  children?: JSX.Element;
}

const Notifications = ({ children }: Props) => {
  const classes = useStyles({})();
  const { t: translator } = useTranslation();
  const translated = translations.header;
  const [anchorNotification, { toggle }] = useToggle<null | HTMLElement>(null);

  const newNotifications = useMemo(
    () => notificationData.filter(notification => !notification.read).length,
    [],
  );

  return (
    <>
      <IconButton onClick={event => toggle(event.currentTarget)}>
        <Badge badgeContent={newNotifications} color="secondary">
          <NotificationsActiveIcon />
        </Badge>
        {children && (
          <Box ml={2} fontSize={16} component="span">
            {children}
          </Box>
        )}
      </IconButton>

      <Popover
        anchorEl={anchorNotification}
        className={classes.crPopover}
        keepMounted
        open={Boolean(anchorNotification)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => toggle(null)}
      >
        <Box>
          <Box px={2} py={1}>
            <Box component="h3" className={classes.title}>
              {`${translator(translated.noti)}(${newNotifications})`}
            </Box>
          </Box>
          <ScrollBar>
            <div className="scroll-submenu">
              <List
                className={classes.list}
                onClick={() => {
                  toggle(null);
                }}
              >
                {notificationData.map(item => (
                  <NotificationItem key={item.id} item={item} />
                ))}
              </List>
            </div>
          </ScrollBar>
          <Box>
            <Button
              className={classes.btnPopover}
              variant="contained"
              color="primary"
            >
              {translator(translated.viewAll)}
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

interface StyleProps {
  smHeight?: number;
  xlHeight?: number;
}

export const useStyles = ({ smHeight, xlHeight }: StyleProps) =>
  makeStyles((theme: Theme) =>
    createStyles({
      crPopover: {
        '& .MuiPopover-paper': {
          width: 260,
          [theme.breakpoints.up('sm')]: {
            width: 300,
          },
          [theme.breakpoints.up('xl')]: {
            width: 380,
          },
        },
        '& .scroll-submenu': {
          maxHeight: smHeight || 360,
          [theme.breakpoints.up('xl')]: {
            maxHeight: xlHeight || 540,
          },
        },
      },
      btnPopover: {
        borderRadius: 0,
        width: '100%',
        textTransform: 'capitalize',
      },
      list: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      title: { margin: 0 },
    }),
  );

export { Notifications };
