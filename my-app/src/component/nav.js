import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieIcon from '@material-ui/icons/Movie';
import MoodIcon from '@material-ui/icons/Mood';
import {Link} from "react-router-dom"

const useStyles = makeStyles({
  root: {
    height: 55,
    width: 400,
    backgroundColor: '#e4e4e4',
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  let navClasses = [classes.root, 'navbar'];

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={navClasses.join(' ')}
    >
      <BottomNavigationAction label="Movies" component={Link} to="/movies?user=601" icon={<MovieIcon />} />
      <BottomNavigationAction label="Suggestion" component={Link} to="/suggestion?user=601" icon={<MoodIcon />} />
    </BottomNavigation>
  );
}