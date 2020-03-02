import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useGetMultipleMesurements from '../../hooks/useGetMultipleMesurements';

const colors: string[] = ['#f75176', '#10acf3', '#dd2ade', '#525174', '#fece42', '#1ba362'];

const Chart = () => {
  const { measurements, selectedMetricsMetadata, metricUnits } = useGetMultipleMesurements();

  const formatDateToTime = (time: number) => {
    return new Date(time).toLocaleTimeString();
  };

  if (selectedMetricsMetadata.length > 0) {
    return (
      <ResponsiveContainer width={'100%'} height={600}>
        <LineChart
          width={1200}
          height={500}
          data={[...measurements]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="at" tickFormatter={formatDateToTime} />
          {selectedMetricsMetadata.map((metric: { [key: string]: string; unit: string }, index: number) => (
            <Line
              isAnimationActive={false}
              key={metric.name}
              dot={false}
              yAxisId={metric.unit}
              name={metric.name}
              type="linear"
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
      </ResponsiveContainer>
    );
  } else {
    return null;
  }
};

export default Chart;
