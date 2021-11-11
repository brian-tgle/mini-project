import React from 'react';
import Chart from 'react-apexcharts';
import { Container, Row, Col } from 'react-bootstrap';

function Dashboard() {
  const data = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };

  const pieChart = {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              width="100%"
            />
          </Col>
          <Col md="6">
            <Chart
              options={pieChart.chartOptions}
              series={pieChart.series}
              type="pie"
              width="100%"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
