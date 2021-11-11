import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import {
  Badge, Button, Card, Table
} from 'react-bootstrap';
import CategoryRepository from 'services/categoryRepository';
import useCategoryStore from 'stores/category';
import expenseStyles from '../Expense/Expense.module.scss';

const TypeOfEventList = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryState, categoryActions] = useCategoryStore();

  const fetchData = (callback = () => {}) => {
    CategoryRepository.getAll().then((response) => {
      setCategories(response.data);
      setLoading(false);
      callback();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryState.needRefresh) {
      setLoading(true);
      fetchData(categoryActions.setRefresh(false));
    }
  }, [categoryState.needRefresh]);

  const handleUpdate = (data) => {
    categoryActions.setUpdateData(data);
  };

  const handleRemove = (id) => {
    CategoryRepository.delete(id).then(() => {
      categoryActions.setRefresh(true);
    });
  };

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header>
        <Card.Title as="h3">
          <Badge variant="secondary">List of categories</Badge>
        </Card.Title>
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0">
        {loading ? <Loading /> : (
          <>
            <Table className="table-hover table-striped">
              <thead>
                <tr>
                  <th className="border-0">#</th>
                  <th className="border-0">Title</th>
                  <th className="border-0">Description</th>
                  <th className="border-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td><Badge variant="info">{category?.title}</Badge></td>
                    <td>{category?.description}</td>
                    <td>
                      <div className={expenseStyles.adminAction}>
                        <Button variant="success" onClick={() => handleUpdate(category)} size="sm">
                          <i className="nc-icon nc-check-2" />
                          {' Update'}
                        </Button>
                        <Button variant="danger" onClick={() => handleRemove(category?.id)} size="sm">
                          <i className="nc-icon nc-simple-remove" />
                          {' Remove'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TypeOfEventList;
