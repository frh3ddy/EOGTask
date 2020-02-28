import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/MetricCards/reducer';
import { useSubscription } from 'urql';
import gql from 'graphql-tag';

import { Measurement } from '../Features/MetricCards/reducer';

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
  const metricsData: Measurement[] = useSelector((state: any) => state.metricsData.metricsData);

  const dispatch = useDispatch();
  const { data } = result;

  useEffect(() => {
    if (data) {
      dispatch(actions.metricsMesurementRecived(data.newMeasurement));
    }
  }, [data, dispatch]);

  return { metricsData, selectedMetrics };
};

export default useMetricsData;
