import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/MetricCards/reducer';
import { useSubscription } from 'urql';
import gql from 'graphql-tag';

const subscriptionQuery = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

const useMetricsData = () => {
  const [result] = useSubscription({
    query: subscriptionQuery,
  });

  const selectedMetrics = useSelector((state: any) => state.metricsSelector.selectedMetrics);
  const metricsData = useSelector((state: any) => state.metricsData.metricsData);

  const dispatch = useDispatch();
  const { data } = result;

  useEffect(() => {
    if (data && selectedMetrics.includes(data.newMeasurement.metric)) {
      dispatch(actions.metricsMesurementRecived(data.newMeasurement));
    } else if (data) {
      dispatch(actions.metricsMesurementRemoved(data.newMeasurement.metric));
    }
  }, [data, selectedMetrics, dispatch]);

  return metricsData;
};

export default useMetricsData;
