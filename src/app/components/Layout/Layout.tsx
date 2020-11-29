import React, { useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';

interface Props {
  children?: JSX.Element;
}

const Layout = (props: Props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs />
        {props.children}
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar, // necessary for content to be below app bar
    content: {
      overflowX: 'hidden',
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  }),
);

export { Layout };
