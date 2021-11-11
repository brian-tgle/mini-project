import React, { useEffect, useState } from 'react';
import {
  Badge, Button, Card, Table
} from 'react-bootstrap';
import ExpenseRepository from 'services/expenseRepository';
import useExpenseStore from 'stores/expense';
import { PAGINATION, ACTION_TYPES } from 'common/constants';
import CustomPagination from 'components/Expense/List/Pagination';
import Loading from 'components/Loading/Loading';
import TableHead from './TableHead';
import ModalForm from '../Modal/ModalForm';
import ExpenseModal from '../Modal';
import TableRow from './TableRow';
import styles from '../Expense.module.scss';

const ExpenseList = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: PAGINATION.DEFAULT_PAGE, totalPages: 0
  });
  const [expenseList, setExpenseList] = useState([]);
  const [expenseState, expenseActions] = useExpenseStore();

  const fetchData = (callback = () => {}, page = 1) => {
    setLoading(true);
    ExpenseRepository.getAll(page, PAGINATION.PAGE_SIZE).then((response) => {
      setExpenseList(response.data);
      setPagination((prevState) => ({ ...prevState, totalPages: response.totalPages }));
      callback();
    }).catch(() => {
      setExpenseList([]);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleChangePage = (currentPage) => {
    setPagination((prevState) => ({ ...prevState, currentPage }));
  };

  useEffect(() => {
    if (expenseState.needRefresh) {
      if (pagination.currentPage !== PAGINATION.DEFAULT_PAGE) {
        handleChangePage(1);
      }
      fetchData(expenseActions.setRefresh(false));
    }
  }, [expenseState.needRefresh]);

  useEffect(() => {
    fetchData(() => {}, pagination.currentPage);
  }, [pagination.currentPage]);

  const handleCreate = () => {
    expenseActions.setExpenseData({
      type: ACTION_TYPES.CREATE
    });
    expenseActions.setShowModal(true);
  };

  return (
    <>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h3" className={styles.expenseHeader}>
            <Badge variant="secondary">List of expenses</Badge>
            <Button onClick={handleCreate} size="sm" className="btn-fill pull-right">
              <i className="nc-icon nc-simple-add" />
              {' Create'}
            </Button>
          </Card.Title>
          <p className="card-category">
            Here is the list of expenses created by user
          </p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          {loading ? <Loading /> : (
            <>
              <Table className="table-hover table-striped">
                <TableHead />
                <tbody>
                  {expenseList?.map((expense, index) => (
                    <TableRow key={expense.id} expense={expense} index={index} />
                  ))}
                </tbody>
              </Table>
              <CustomPagination
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
                handleChangePage={handleChangePage}
              />
            </>
          )}
        </Card.Body>
      </Card>
      <ExpenseModal
        show={expenseState.showModal}
      >
        <ModalForm />
      </ExpenseModal>
    </>
  );
};

export default ExpenseList;
