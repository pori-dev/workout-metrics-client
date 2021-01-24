import AuthRepository from './auth-repository';
import SchedulesRepository from './schedules-repository';

const repositories = {
  auth: AuthRepository,
  schedules: SchedulesRepository,
  // add other repositories here
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
