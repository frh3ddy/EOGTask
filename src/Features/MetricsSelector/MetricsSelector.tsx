import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useGetMetricNames from '../../hooks/useGetMetricNames';
import { useDispatch } from 'react-redux';
import { actions } from '../MetricsSelector/reducer';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 25,
    },
  }),
);

export default function CheckboxLabels() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const metrics = useGetMetricNames();

  const [state, setState] = useState<{ [key: string]: boolean }>(() => {
    return metrics.reduce((result: { [key: string]: boolean }, item: string) => {
      result[item] = false;
      return result;
    }, {});
  });

  useEffect(() => {
    const m = Object.entries(state)
      .filter(e => e.includes(true))
      .map(h => h[0]);

    dispatch(actions.metricsSelected(m));
  }, [state]);

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FormGroup row>
        {metrics.map((m: string) => {
          return (
            <FormControlLabel
              key={m}
              control={<Checkbox checked={Boolean(state[m])} onChange={handleChange(m)} value={m} color="primary" />}
              label={m}
            />
          );
        })}
      </FormGroup>
    </div>
  );
}
