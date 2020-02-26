import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricNames = {
  getMetrics: string[];
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metricsNames: new Array<string>(),
  selectedMetrics: new Array<string>(),
};

const slice = createSlice({
  name: 'metricsSelector',
  initialState,
  reducers: {
    metricsNamesRetreaved: (state, action: PayloadAction<MetricNames>) => {
      const { getMetrics } = action.payload;
      state.metricsNames = getMetrics;
    },
    metricsSelected: (state, action: PayloadAction<string[]>) => {
      state.selectedMetrics = action.payload;
    },
    apiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
