import { createSlice, PayloadAction } from 'redux-starter-kit';
import { Measurement } from '../MetricCards/reducer';

import { formatData } from './helpers';

export type ApiErrorAction = {
  error: string;
};

export type MultipleMeasurements = {
  metric: string;
  measurements: Measurement[];
};

const initialState = {
  measurements: new Array<{ [key: string]: number; at: number }>(),
  units: new Array<string>(),
  metricsMetadata: new Array<{ [key: string]: string; unit: string }>(),
};

const slice = createSlice({
  name: 'metricsChart',
  initialState,
  reducers: {
    mesurementsRecevied: (state, action: PayloadAction<MultipleMeasurements[]>) => {
      const rawMasurements = action.payload;
      state.measurements = formatData(rawMasurements);
      state.metricsMetadata = rawMasurements.map((el: MultipleMeasurements) => ({
        name: el.metric,
        unit: el.measurements[0].unit,
      }));
    },
    waterApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
