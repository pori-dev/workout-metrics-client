import Repository from './repository';

const resource = 'weights';
export default {
  fetchAllByMonth(month) {
    return Repository.get(resource, {
      params: {
        month,
      },
    });
  },

  fetchAllFromDate(date) {
    return Repository.get(resource, {
      params: {
        date,
      },
    });
  },

  create(weight, date) {
    return Repository.post(resource, {
      weight,
      date,
    });
  },

  update(weight, id) {
    return Repository.put(`${resource}/${id}`, {
      weight,
    });
  },

  delete(id) {
    return Repository.delete(`${resource}/${id}`);
  },

  createGoal(goalWeight, goalDate) {
    return Repository.post(`${resource}/goal`, {
      weight: goalWeight,
      date: goalDate,
    });
  },

  fetchWeightGoal() {
    return Repository.get(`${resource}/goal`);
  },
};
