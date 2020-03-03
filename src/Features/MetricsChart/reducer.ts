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
    measurementsRecevied: (state, action: PayloadAction<MultipleMeasurements[]>) => {
      const rawMeasurements = action.payload;
      state.measurements = formatData(rawMeasurements);
      state.metricsMetadata = rawMeasurements.map((el: MultipleMeasurements) => ({
        name: el.metric,
        unit: el.measurements[0].unit,
      }));
    },
    newMeasurementsRecevied: (state, action: PayloadAction<Measurement>) => {
      if (state.measurements.length) {
        const { at: currentMeasurementTimestamp, metric, value } = action.payload;
        const auxMeasurements = [...state.measurements];
        const lastItem = auxMeasurements[auxMeasurements.length - 1];

        if (lastItem.at < currentMeasurementTimestamp) {
          state.measurements = auxMeasurements.concat({ [metric]: value, at: currentMeasurementTimestamp });
        } else if (lastItem.at === currentMeasurementTimestamp) {
          auxMeasurements[auxMeasurements.length - 1] = {
            ...lastItem,
            [metric]: value,
          };
          state.measurements = auxMeasurements;
        }
      }
    },
    waterApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
