import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      margin: '6px',
      minWidth: 275,
      backgroundColor: '#FF9900'
    },

    title: {
      fontSize: 16,
      fontWeight: 'bold'
    },
});
  
export default function SimpleCard({ title }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>

            <Typography className={classes.title} variant="h5" component="h2">
                {title}
            </Typography>
            
            </CardContent>
        </Card>
    );
}