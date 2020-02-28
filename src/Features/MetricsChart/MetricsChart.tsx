import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useGetMultipleMesurements from '../../hooks/useGetMultipleMesurements';

const colors: string[] = ['#f75176', '#10acf3', '#dd2ade', '#525174', '#fece42', '#1ba362'];

const Chart = () => {
  const { measurements, selectedMetricsMetadata, metricUnits } = useGetMultipleMesurements();

  const formatDateToTime = (time: number) => {
    return new Date(time).toLocaleTimeString();
  };

  if (selectedMetricsMetadata.length > 0) {
    return (
      <LineChart
        width={900}
        height={300}
        data={[...measurements]}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" interval="preserveStartEnd" minTickGap={20} tickFormatter={formatDateToTime} />
        {selectedMetricsMetadata.map((metric: { [key: string]: string; unit: string }, index: number) => (
          <Line
            key={metric.name}
            dot={false}
            yAxisId={metric.unit}
            name={metric.name}
            type="monotone"
            dataKey={metric.name}
            stroke={colors[index]}
          />
        ))}
        {metricUnits.map((unit: string, index: number) => (
          <YAxis key={index} yAxisId={unit} label={{ value: unit, position: 'insideBottomLeft' }} />
        ))}
        <Tooltip labelFormatter={value => new Date(value).toDateString()} />
        <Legend />
      </LineChart>
    );
  } else {
    return null;
  }
};

export default Chart;
