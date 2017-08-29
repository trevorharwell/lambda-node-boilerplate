import { runAsSaga } from 'utils/lambda';
import { call } from 'redux-saga/effects';
import createGithubGateway from 'gateway/createGithubGateway';

export function* defaultSaga() {
  const { getRepositoryPage } = yield call(createGithubGateway);
  const repositories = yield call(getRepositoryPage);
  return repositories;
}

export const handler = runAsSaga(defaultSaga);
