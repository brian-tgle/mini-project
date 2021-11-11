import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryForm from 'components/Category/Form';
import CategoryList from 'components/Category/List';

function Category() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="4">
            <CategoryForm />
          </Col>
          <Col md="8">
            <CategoryList />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Category;
