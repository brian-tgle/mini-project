/* eslint-disable dot-notation */
import React from 'react';
import { ACTION_TYPES } from 'common/constants';
import { Badge, Button } from 'react-bootstrap';
import useExpenseStore from 'stores/expense';
import { formatDate, convertToInputDate } from 'ultis/date';
import currencyFormatter from 'ultis/currency';
import styles from '../Expense.module.scss';

const TableRow = ({ expense, index }) => {
  const [, expenseActions] = useExpenseStore();
  const handleEdit = () => {
    const expenseData = {
      ...expense,
      date: convertToInputDate(expense?.date),
      category: expense?.category['_id']
    };
    expenseActions.setExpenseData({
      type: ACTION_TYPES.UPDATE,
      expense: expenseData
    });
    expenseActions.setShowModal(true);
  };
  const handleDelete = () => {
    expenseActions.setExpenseData({
      type: ACTION_TYPES.DELETE,
      expenseId: expense.id
    });
    expenseActions.setShowModal(true);
  };
  return (
    <tr>
      <td className={styles.index}>{index + 1}</td>
      <td className={styles.category}>
        <Badge variant="info">{expense?.category?.title}</Badge>
      </td>
      <td>{expense?.title}</td>
      <td><b>{currencyFormatter(expense?.value)}</b></td>
      <td>{formatDate(expense?.date)}</td>
      <td>
        <div className={styles.adminAction}>
          <Button onClick={handleEdit} variant="success" size="sm">
            <i className="nc-icon nc-check-2" />
            {' Edit'}
          </Button>
          <Button onClick={handleDelete} variant="danger" size="sm">
            <i className="nc-icon nc-simple-remove" />
            {' Delete'}
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
