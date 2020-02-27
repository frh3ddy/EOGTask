import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MetricsSelector/reducer';
import { reducer as metricsDataReducer } from '../Features/MetricCards/reducer';
import { reducer as measurementReducer } from '../Features/MetricsChart/reducer';

export default {
  weather: weatherReducer,
  metricsSelector: metricsReducer,
  metricsData: metricsDataReducer,
  metricMeasurement: measurementReducer,
};
