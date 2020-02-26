import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MetricsSelector/reducer';
export default {
  weather: weatherReducer,
  metricsSelector: metricsReducer,
};
