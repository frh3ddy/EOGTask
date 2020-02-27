import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/MetricsChart/reducer';
import { useQuery } from 'urql';
import gql from 'graphql-tag';
// import { Measurament } from '../Features/MetricCards/reducer';

const query = gql`
  query($metrics: [MeasurementQuery]) {
    getMultipleMeasurements(input: $metrics) {
      metric
      measurements {
        metric
        at
        value
        unit
      }
    }
  }
`;

const getMinutesAgo = (minutes: number) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - minutes);
  return now.getTime();
};

const fifteenMinutesAgo = getMinutesAgo(15);

const useGetMetricNames = () => {
  const metricsData = useSelector((state: any) => state.metricsData.metricsData);
  const selectedMetrics = useSelector((state: any) => state.metricsSelector.selectedMetrics);
  const measurements = useSelector((state: any) => state.metricMeasurement.measurements);

  const metrics = selectedMetrics.map((metricName: string) => {
    const before = metricsData[metricName] && metricsData[metricName].at;
    return {
      metricName,
      after: fifteenMinutesAgo,
      ...(before && { before }),
    };
  });

  const [result] = useQuery({
    query,
    variables: { metrics },
  });

  const dispatch = useDispatch();
  const { fetching, data } = result;

  useEffect(() => {
    if (!fetching) {
      dispatch(actions.mesurementsRecevied(data.getMultipleMeasurements));
    }

    if (metrics.lenght < 1 && measurements.lenght > 0) {
      dispatch(actions.mesurementsRecevied([]));
    }
  }, [fetching, metrics, dispatch, data, measurements]);

  return measurements;
};

export default useGetMetricNames;
