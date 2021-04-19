import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactStars from "react-rating-stars-component";
import setRating from '../script/rate';

const useStyles = makeStyles({
    root: {
      margin: '6px',
      //minWidth: 275,
      width: '400px',
      backgroundColor: '#FF9900'
    },

    title: {
      fontSize: 16,
      fontWeight: 'bold'
    },
});

export default function SimpleCard({ userId, title, movieId }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>

            <Typography className={classes.title} variant="h5" component="h2">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {title}
                            </td>
                            <td>
                                <ReactStars
                                    count={5}
                                    onChange={(newRating) => {
                                        setRating(userId, newRating, movieId);
                                    }}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Typography>
            
            </CardContent>
        </Card>
    );
}