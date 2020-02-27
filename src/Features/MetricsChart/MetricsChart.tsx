import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useGetMultipleMesurements from '../../hooks/useGetMultipleMesurements';

import { Measurament } from '../MetricCards/reducer';

const colors: string[] = ['#f75176', '#10acf3', '#dd2ade', '#525174', '#fece42', '#1ba362'];

const Chart = () => {
  const measurements = useGetMultipleMesurements();
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

  const kkk = measurements.map((el: { metric: string; measurements: Measurament[] }) => ({
    metric: el.metric,
    unit: el.measurements[0].unit,
  }));

  const units = kkk
    .map((k: { metric: string; unit: string }) => k.unit)
    .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);

  const formatDateToTime = (time: number) => {
    return new Date(time).toLocaleTimeString();
  };

  return (
    <LineChart
      width={900}
      height={300}
      data={[...data]}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="at" interval="preserveStartEnd" minTickGap={20} tickFormatter={formatDateToTime} />
      {kkk.map((k: { metric: string; unit: string }, index: number) => (
        <Line
          key={k.metric}
          dot={false}
          yAxisId={k.unit}
          name={k.metric}
          type="monotone"
          dataKey={k.metric}
          stroke={colors[index]}
          activeDot={{ r: 8 }}
        />
      ))}
      {units.map((unit: string, index: number) => (
        <YAxis key={index} yAxisId={unit} label={{ value: unit, position: 'insideBottomLeft' }} />
      ))}
      <Tooltip labelFormatter={value => new Date(value).toDateString()} />
      <Legend />
    </LineChart>
  );
};

export default Chart;
