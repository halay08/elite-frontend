import React, { useMemo } from 'react';
import { IconButton, Badge, Popover, Box, List } from '@material-ui/core';
import { Sms as SmsIcon } from '@material-ui/icons';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { MessageItem } from './Item';
import messageData from './mocks';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useStyles } from 'app/components/Layout/Header/Notifications/Notifications';
import { useToggle } from 'ahooks';

interface Props {
  children?: JSX.Element;
}

const Messages = ({ children }: Props) => {
  const classes = useStyles({ smHeight: 380, xlHeight: 500 })();
  const { t: translator } = useTranslation();
  const translated = translations.header;
  const [anchorNotification, { toggle }] = useToggle<null | HTMLElement>(null);

  const newMessages = useMemo(
    () => messageData.filter(message => !message.read).length,
    [],
  );

  return (
    <>
      <IconButton
        className={classes.headerButton}
        onClick={event => toggle(event.currentTarget)}
      >
        <Badge badgeContent={newMessages} color="secondary">
          <SmsIcon />
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
              {`${translator(translated.messange)}(${newMessages})`}
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
                {messageData.map(item => (
                  <MessageItem key={item.id} item={item} />
                ))}
              </List>
            </div>
          </ScrollBar>
        </Box>
      </Popover>
    </>
  );
};

export { Messages };
