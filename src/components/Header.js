import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  createdBY: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid19 Tracker
            <AssessmentIcon style={{verticalAlign:'middle'}}/>
          </Typography>
          <Typography variant="body2" className={classes.createdBY}>
          © 2021 Copyright: Shahbaz Ali
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
