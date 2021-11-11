import React from 'react';
import useExpenseStore from 'stores/expense';
import { ACTION_TYPES } from 'common/constants';
import CreateOrUpdateExpenseForm from '../Form/CreateOrUpdate';
import DeleteExpenseForm from '../Form/Delete';

const ModalForm = () => {
  const [expenseState] = useExpenseStore();
  const type = expenseState.expenseData?.type;
  switch (type) {
    case ACTION_TYPES.CREATE:
    case ACTION_TYPES.UPDATE:
      return <CreateOrUpdateExpenseForm />;
    case ACTION_TYPES.DELETE:
      return <DeleteExpenseForm expenseId={expenseState.expenseData?.expenseId} />;
    default:
      return <></>;
  }
};

export default ModalForm;
