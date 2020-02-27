import { createSlice, PayloadAction } from 'redux-starter-kit';
import { Measurament } from '../MetricCards/reducer';

export type ApiErrorAction = {
  error: string;
};

export type MultipleMeasurements = {
  metric: string;
  measurements: Measurament[];
};

const initialState = {
  measurements: new Array<MultipleMeasurements>(),
};

const slice = createSlice({
  name: 'metricsChart',
  initialState,
  reducers: {
    mesurementsRecevied: (state, action: PayloadAction<MultipleMeasurements[]>) => {
      state.measurements = action.payload;
    },
    waterApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
