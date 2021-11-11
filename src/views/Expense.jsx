import React from 'react';
import ExpenseList from 'components/Expense/List/List';
import { Container, Row, Col } from 'react-bootstrap';

function Expense() {
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

export default Expense;
