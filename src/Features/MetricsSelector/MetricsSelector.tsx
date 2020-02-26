import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useGetMetricNames from '../../hooks/useGetMetricNames';
import { useDispatch } from 'react-redux';
import { actions } from '../MetricsSelector/reducer';

type FormatedMetric = {
  [key: string]: boolean;
};

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

  const [state, setState] = useState<FormatedMetric>(() => {
    return metrics.reduce((result: FormatedMetric, item: string) => {
      result[item] = false;
      return result;
    }, {});
  });

  useEffect(() => {
    const metric = Object.entries(state)
      .filter(entry => entry.includes(true))
      .map(entryArray => entryArray[0]);

    dispatch(actions.metricsSelected(metric));
  }, [state, dispatch]);

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FormGroup row>
        {metrics.map((metric: string) => {
          return (
            <FormControlLabel
              key={metric}
              control={
                <Checkbox
                  checked={Boolean(state[metric])}
                  onChange={handleChange(metric)}
                  value={metric}
                  color="primary"
                />
              }
              label={metric}
            />
          );
        })}
      </FormGroup>
    </div>
  );
}
