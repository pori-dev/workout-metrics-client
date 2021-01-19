import AuthRepository from './auth-repository';

const repositories = {
  auth: AuthRepository,
  // add other repositories here
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
