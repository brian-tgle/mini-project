import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ data }) => {
  const pieChart = {
    series: data?.map((item) => item.totalValues),
    options: {
      labels: data?.map((item) => item.title)
    }
  };
  return (
    <Chart
      options={pieChart.options}
      series={pieChart.series}
      type="pie"
      width="100%"
    />
  );
};

export default PieChart;
