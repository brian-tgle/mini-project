import BarChart from 'components/Chart/Bar';
import PieChart from 'components/Chart/Pie';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReportRepository from 'services/reportRepository';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
  useEffect(() => {
    setLoading(true);
    ReportRepository.get().then((result) => {
      setReportData(result.data);
      setLoading(false);
    });
  }, []);
  return loading ? <Loading />
    : (
      <Container fluid>
        <h3 className="text-center">Last 30 days report</h3>
        <Row>
          <Col md="6">
            <BarChart data={reportData} />
          </Col>
          <Col md="6">
            <PieChart data={reportData} />
          </Col>
        </Row>
      </Container>
    );
}

export default Dashboard;
