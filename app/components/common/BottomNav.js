import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReorderIcon from '@material-ui/icons/Reorder';
import RestoreIcon from '@material-ui/icons/Restore';
import QueueIcon from '@material-ui/icons/Queue';
import { useRouter } from 'next/router'
import Link from 'next/link'

import map from 'lodash/map'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  }
});

const routes = [
  {
    icon: <ReorderIcon />,
    pathname: '/',
  },
  {
    icon: <RestoreIcon />,
    pathname: '/favorite',
  },
  {
    icon: <QueueIcon />,
    pathname: '/add',
  }
]

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
    >
      {
        map(routes, (r, key) => {
          return (
            <Link href={r.pathname} key={key}>
              <BottomNavigationAction {...{ icon: r.icon, selected: r.pathname === router.pathname }} />
            </Link>
          )
        })
      }
    </BottomNavigation>
  );
}