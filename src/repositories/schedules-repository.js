import Repository from './repository';

const resource = 'schedules';
export default {
  create(date, status) {
    return Repository.post(resource, {
      date,
      status,
    });
  },

  fetchAllByMonth(date) {
    return Repository.get(resource, {
      params: {
        month: date,
      },
    });
  },

  update(id, status) {
    return Repository.put(`${resource}/${id}`, {
      status,
    });
  },

  remove(id) {
    return Repository.delete(`${resource}/${id}`);
  },
};
