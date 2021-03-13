import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import scot from '../api/scot';

const sections = [
  { title: 'Overview', url: '/' },
  { title: 'Subscribe', url: '/subscribe' },
  { title: 'Recommendation', url: '#' },
  { title: 'Purchase', url: '#' },
  { title: 'Delivery', url: '#' },
  { title: 'Feedback', url: '#' },
];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header() {
  const classes = useStyles();

  const login = async () => {
    const urlStr = await scot.getAuthURL('kakao');
    window.location.href = urlStr;
  };

  const logout = () => scot.logout('kakao');

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          SCOT
        </Typography>
        <IconButton onClick={login}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={logout}>
          <PersonIcon />
        </IconButton>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            href={section.url}
            variant="body2"
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
}
