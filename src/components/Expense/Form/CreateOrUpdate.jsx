/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Row
} from 'react-bootstrap';
import { useFormik } from 'formik';
import CategoryRepository from 'services/categoryRepository';
import ExpenseRepository from 'services/expenseRepository';
import validationSchema from 'validationSchemas/expense';
import useExpenseStore from 'stores/expense';
import { ACTION_TYPES } from 'common/constants';
import styles from 'assets/scss/common.module.scss';
import expenseStyles from '../Expense.module.scss';

const CreateExpenseForm = () => {
  const [eventCategories, setEventCategories] = useState([]);
  const [error, setError] = useState(false);
  const [expenseState, expenseActions] = useExpenseStore();
  const isEdit = expenseState.expenseData?.type === ACTION_TYPES.UPDATE;
  const initialValues = isEdit ? expenseState.expenseData?.expense : {
    category: '',
    date: '',
    title: '',
    value: ''
  };
  useEffect(() => {
    CategoryRepository.getAll().then((response) => {
      setEventCategories(response.data);
    });
  }, []);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched
  } = useFormik({
    initialValues,
    onSubmit: (data) => {
      ExpenseRepository.createOrUpdate(data).then(() => {
        expenseActions.setShowModal(false);
        expenseActions.setExpenseData({});
        expenseActions.setRefresh(true);
      }).catch(() => {
        setError(true);
      });
    },
    validationSchema
  });

  const handleCancel = () => {
    expenseActions.setShowModal(false);
    expenseActions.setExpenseData({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md="12">
          <Form.Group>
            <label>Title</label>
            <Form.Control
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.title}
              isInvalid={touched?.title && errors?.title}
            />
            {touched?.title && errors?.title && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors?.title}
            </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md="12">
          <Form.Group>
            <label>Category</label>
            <Form.Control
              as="select"
              name="category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.category}
              isInvalid={touched?.category && errors?.category}
            >
              <option>Choose a category</option>
              {eventCategories?.map((category) => (
                <option key={category?.id} value={category?.id}>{category?.title}</option>
              ))}
            </Form.Control>
            {touched?.category && errors?.category && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors?.category}
            </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group>
            <label>Date</label>
            <Form.Control
              name="date"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.date}
              isInvalid={touched?.date && errors?.date}
            />
            {touched?.date && errors?.date && (
              <Form.Control.Feedback className={styles.inValid} type="invalid">
                {errors?.date}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group>
            <label>Value($)</label>
            <Form.Control
              name="value"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.value}
              isInvalid={touched?.value && errors?.value}
            />
            {touched?.value && errors?.value && (
              <Form.Control.Feedback className={styles.inValid} type="invalid">
                {errors?.value}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <div className={expenseStyles.formActions}>
        <Button
          className="btn-fill"
          size="sm"
          onClick={handleCancel}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          className="btn-fill"
          size="sm"
          type="submit"
          variant="primary"
        >
          {`${isEdit ? 'Edit' : 'Create'} Expense`}
        </Button>
      </div>
      {error ? <p className="text-center">{`${isEdit ? 'Edit' : 'Create'} a expense failed! Please try again later.`}</p> : <></>}
    </Form>
  );
};

export default CreateExpenseForm;
