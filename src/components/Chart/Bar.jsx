import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ data }) => {
  const chartOption = {
    options: {
      xaxis: {
        categories: data.map((item) => item.title)
      }
    },
    series: [
      {
        name: 'series-1',
        data: data.map((item) => item.totalValues)
      }
    ]
  };
  return (
    <Chart
      options={chartOption.options}
      series={chartOption.series}
      type="bar"
      width="100%"
    />
  );
};

export default BarChart;
