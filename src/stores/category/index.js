import { createStore, createHook } from 'react-sweet-state';

export const CATEGORY_STORE = 'CategoryStore';
export const initState = {
  updateData: {},
  needRefresh: false
};

export const actions = {
  setUpdateData: (updateData) => ({ setState }) => {
    setState({ updateData });
  },
  setRefresh: (needRefresh) => ({ setState }) => {
    setState({ needRefresh });
  }
};

export const Store = createStore({
  initialState: initState,
  actions,
  name: CATEGORY_STORE
});

const useCategoryStore = createHook(Store);

export default useCategoryStore;
