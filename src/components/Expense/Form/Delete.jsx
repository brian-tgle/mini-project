import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ExpenseRepository from 'services/expenseRepository';
import useExpenseStore from 'stores/expense';
import expenseStyles from '../Expense.module.scss';

const DeleteExpense = ({ expenseId }) => {
  const [error, setError] = useState(false);
  const [, expenseActions] = useExpenseStore();
  const handleCancel = () => {
    expenseActions.setCancelAction();
  };
  const handleSubmit = () => {
    ExpenseRepository.delete(expenseId).then(() => {
      expenseActions.setActionSuccess();
    }).catch(() => {
      setError(true);
    });
  };

  return (
    <Form as="div">
      <p>Do you want to delete?</p>
      <div className={expenseStyles.formActions}>
        <Button
          className="btn-fill"
          size="sm"
          onClick={handleCancel}
          variant="secondary"
        >
          No
        </Button>
        <Button
          className="btn-fill"
          size="sm"
          onClick={handleSubmit}
          variant="danger"
        >
          Yes
        </Button>
      </div>
      {error ? <p className="text-center">Opps!!! Can not delete the expense. Please try again later.</p> : <></>}
    </Form>
  );
};

export default DeleteExpense;
