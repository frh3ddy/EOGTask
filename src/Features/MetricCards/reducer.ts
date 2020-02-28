import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

type State = {
  metricsData: { [key: string]: Measurement };
  selectedMetricsData: Measurement[];
  metricUnits: string[];
};

const initialState: State = {
  metricsData: {},
  selectedMetricsData: [],
  metricUnits: [],
};

const slice = createSlice({
  name: 'metricCards',
  initialState,
  reducers: {
    metricsMesurementRecived: (state, action: PayloadAction<Measurement>) => {
      const { metric } = action.payload;
      state.metricsData = { ...state.metricsData, [metric]: action.payload };
    },
    selectedMetricsDataRecived: (state, action: PayloadAction<Measurement>) => {
      const { metric } = action.payload;
      state.metricsData = { ...state.metricsData, [metric]: action.payload };
    },
    apiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
