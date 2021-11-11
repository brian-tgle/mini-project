import React from 'react';
import { Badge, Modal } from 'react-bootstrap';

const ExpenseModal = ({
  children,
  show
}) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title as={Badge} variant="danger">Expense</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
  </Modal>
);

export default ExpenseModal;
