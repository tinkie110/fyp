import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieIcon from '@material-ui/icons/Movie';
import MoodIcon from '@material-ui/icons/Mood';
import {Link} from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width: 500,
    backgroundColor: '#FF9900',
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Movies" component={Link} to="/movies" icon={<MovieIcon />} />
      <BottomNavigationAction label="Suggestion" component={Link} to="/suggestion" icon={<MoodIcon />} />
    </BottomNavigation>
  );
}