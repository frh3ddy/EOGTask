import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import useGetMetricNames from '../../hooks/useGetMetricNames';
import { useDispatch } from 'react-redux';
import { actions } from '../MetricsSelector/reducer';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    chips: {
      padding: '0 10px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    clear: {
      marginLeft: 'auto',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MetricsSelector() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const metrics = useGetMetricNames();

  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    dispatch(actions.metricsSelected(state));
  }, [state, dispatch]);

  const handleDelete = (metricName: string) => (event: React.ChangeEvent) => {
    event.stopPropagation();
    setState(state => state.filter(name => name !== metricName));
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState(event.target.value as string[]);
  };

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setState([]);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="metrics">Select metrics</InputLabel>
        <Select
          labelId="metrics"
          id="metrics-chip"
          multiple
          value={state}
          onChange={handleChange}
          input={<Input id="select-multiple-metrics" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as string[]).map(value => (
                <Chip
                  onDelete={handleDelete(value)}
                  onClick={e => e.stopPropagation()}
                  key={value}
                  label={value}
                  className={classes.chip}
                />
              ))}
              {(selected as string[]).length && (
                <IconButton onClick={handleClear} aria-label="delete" size="small" className={classes.clear}>
                  <ClearIcon />
                </IconButton>
              )}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {metrics
            .filter((name: string) => !state.includes(name))
            .map((name: string) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          {state.length === metrics.length && <MenuItem disabled>No more metrics</MenuItem>}
        </Select>
      </FormControl>
    </div>
  );
}
