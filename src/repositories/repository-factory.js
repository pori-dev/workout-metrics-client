import AuthRepository from './auth-repository';
import SchedulesRepository from './schedules-repository';
import WeightsRepository from './weights-repository';

const repositories = {
  auth: AuthRepository,
  schedules: SchedulesRepository,
  weights: WeightsRepository,
  // add other repositories here
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
