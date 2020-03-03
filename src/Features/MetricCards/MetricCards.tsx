import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useMetricsData from '../../hooks/useMetricsData';
import { Measurement } from './reducer';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 25,
    },
    card: {
      minWidth: 175,
    },
  }),
);

export default function MetricCards() {
  const classes = useStyles();
  const { metricsData, selectedMetrics } = useMetricsData();
  const data = Object.values<Measurement>(metricsData).filter((measurement: Measurement) =>
    selectedMetrics.includes(measurement.metric),
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {data.map(measurement => (
          <Grid item xl={2} key={measurement.metric}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{measurement.metric}</Typography>
                <Typography variant="h5">{measurement.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
