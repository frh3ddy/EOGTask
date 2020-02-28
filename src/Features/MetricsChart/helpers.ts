import { MultipleMeasurements } from './reducer';

export const formatData = (measurements: MultipleMeasurements[]) => {
  const data = [];

  for (let i = 0; i < measurements.length; i++) {
    for (let j = 0; j < measurements[i].measurements.length; j++) {
      if (data[j] === undefined) {
        data.push({
          [measurements[i].measurements[j].metric]: measurements[i].measurements[j].value,
          at: measurements[i].measurements[j].at,
        });
      } else {
        data[j][measurements[i].measurements[j].metric] = measurements[i].measurements[j].value;
      }
    }
  }
  return data;
};
