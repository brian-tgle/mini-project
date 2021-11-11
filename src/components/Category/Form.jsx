import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import CategoryRepository from 'services/categoryRepository';
import useCategoryStore from 'stores/category';
import categorySchema from 'validationSchemas/category';
import styles from 'assets/scss/common.module.scss';
import expenseStyles from '../Expense/Expense.module.scss';

const TypeOfEventForm = () => {
  const [error, setError] = useState(false);
  const [action, setAction] = useState('Create');
  const [categoryState, categoryActions] = useCategoryStore();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    values,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: (data, { resetForm }) => {
      const payload = categoryState.updateData?.id
        ? { ...data, id: categoryState.updateData?.id }
        : data;
      CategoryRepository.createOrUpdate(payload).then(() => {
        categoryActions.setRefresh(true);
        categoryActions.setUpdateData({});
        resetForm();
      }).catch(() => {
        setError(true);
      });
    },
    validationSchema: categorySchema
  });

  useEffect(() => {
    if (categoryState.updateData?.id) {
      setAction('Update');
      setFieldValue('title', categoryState.updateData?.title);
      setFieldValue('description', categoryState.updateData?.description);
    } else {
      setAction('Create');
    }
  }, [categoryState.updateData.id]);

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">{`${action} category`}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
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
          <Form.Group>
            <label>Description</label>
            <Form.Control
              name="description"
              rows="2"
              as="textarea"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.description}
              isInvalid={touched?.description && errors?.description}
            />
            {touched?.description && errors?.description && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors?.description}
            </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className={expenseStyles.formActions}>
            <Button
              className="btn-fill"
              size="sm"
              onClick={handleReset}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              className="btn-fill"
              size="sm"
              type="submit"
              variant="danger"
            >
              {`${action}`}
            </Button>
          </div>
          {error ? (
            <p className="text-center">
              {`Opps!!! Can not ${action} this category. Please try again later.`}
            </p>
          ) : <></>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TypeOfEventForm;
