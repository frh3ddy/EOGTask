import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

export type Measurament = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

type State = {
  metricsData: { [key: string]: Measurament };
};

const initialState: State = {
  metricsData: {},
};

const slice = createSlice({
  name: 'metricCards',
  initialState,
  reducers: {
    metricsMesurementRecived: (state, action: PayloadAction<Measurament>) => {
      const { metric } = action.payload;
      state.metricsData = { ...state.metricsData, [metric]: action.payload };
    },
    metricsMesurementRemoved: (state, action: PayloadAction<string>) => {
      const metricName = action.payload;
      const { [metricName]: removed, ...restOfMetrics } = state.metricsData;
      state.metricsData = restOfMetrics;
    },
    apiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
