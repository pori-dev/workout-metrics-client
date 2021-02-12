import Repository from './repository';

const resource = 'users';
export default {
  fetch() {
    return Repository.get(resource);
  },

  update(updateData) {
    return Repository.put(`${resource}/profile`, {
      ...updateData,
    });
  },
};
