import React from 'react';
import ExpenseList from 'components/Expense/List/List';
import { Container, Row, Col } from 'react-bootstrap';

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <ExpenseList />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
