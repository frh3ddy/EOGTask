import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import useMetricsData from '../../hooks/useMetricsData';
import { Measurament } from './reducer';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      marginBottom: 20,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    card: {
      minWidth: 250,
    },
  }),
);

const SimpleCard = () => {
  const metricsData = useMetricsData();
  const classes = useStyles();
  const data = Object.values<Measurament>(metricsData);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {data.map(mesurement => (
          <Card className={classes.card} key={mesurement.metric}>
            <CardContent>
              <Typography variant="h5" component="h1">
                {mesurement.metric}
              </Typography>
              <Typography variant="h5" component="h1">
                {mesurement.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </GridList>
    </div>
  );
};

export default SimpleCard;
