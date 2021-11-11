import Repository from './repository';

const url = 'expenses';

const ExpenseRepository = {
  /**
   * /GET. Get the list of expense
   * @return {Array} the list of expense
   */
  getAll: (page, limt) => Repository.get(`${url}?page=${page}&size=${limt}`),

  createOrUpdate: (payload) => {
    if (payload.id) {
      const { id, ...data } = payload;
      return Repository.put(`${url}/${id}`, data);
    }
    return Repository.post(url, payload);
  },

  delete: (expenseId) => Repository.delete(`${url}/${expenseId}`)
};

export default ExpenseRepository;
