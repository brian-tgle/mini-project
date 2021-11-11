import { createStore, createHook } from 'react-sweet-state';

export const EXPENSE_STORE = 'Expense_Store';
export const initState = {
  showModal: false,
  expenseData: {},
  needRefresh: false
};

export const actions = {
  setShowModal: (showModal) => ({ setState }) => {
    setState({ showModal });
  },
  setExpenseData: (expenseData) => ({ setState }) => {
    setState({ expenseData });
  },
  setRefresh: (needRefresh) => ({ setState }) => {
    setState({ needRefresh });
  }
};

export const Store = createStore({
  initialState: initState,
  actions,
  name: EXPENSE_STORE
});

const useExpenseStore = createHook(Store);

export default useExpenseStore;
