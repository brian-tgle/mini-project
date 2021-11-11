import Repository from './repository';

const url = 'categories';

const CategoryRepository = {
  /**
   * /GET. Get the list of event type
   * @return {Array} the list of event type
   */
  getAll: () => Repository.get(url),

  createOrUpdate: (payload) => {
    if (payload.id) {
      const { id, ...data } = payload;
      return Repository.put(`${url}/${id}`, data);
    }
    return Repository.post(url, payload);
  },
  delete: (id) => Repository.delete(`${url}/${id}`)
};

export default CategoryRepository;
