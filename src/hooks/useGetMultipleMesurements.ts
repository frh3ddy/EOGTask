import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/MetricsChart/reducer';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

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

const useGetMultipleMesurements = () => {
  const selectedMetrics = useSelector((state: any) => state.metricsSelector.selectedMetrics);
  const metricsNames = useSelector((state: any) => state.metricsSelector.metricsNames);
  const measurements = useSelector((state: any) => state.metricMeasurement.measurements);
  const metricsMetadata = useSelector((state: any) => state.metricMeasurement.metricsMetadata);

  const selectedMetricsMetadata = metricsMetadata.filter((l: { [key: string]: string; unit: string }) =>
    selectedMetrics.includes(l.name),
  );

  const metricUnits = selectedMetricsMetadata
    .map((el: { [key: string]: string; unit: string }) => el.unit)
    .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);

  const metrics = useMemo(() => {
    return metricsNames.map((metricName: string) => {
      return {
        metricName,
        after: getMinutesAgo(30),
      };
    });
  }, [metricsNames]);

  const [result] = useQuery({
    query,
    variables: { metrics },
    pause: measurements.length > 0,
  });

  const dispatch = useDispatch();
  const { fetching, data } = result;

  useEffect(() => {
    if (!fetching && data) {
      dispatch(actions.measurementsRecevied(data.getMultipleMeasurements));
    }
  }, [fetching, dispatch, data]);

  return { measurements, selectedMetricsMetadata, metricUnits };
};

export default useGetMultipleMesurements;
