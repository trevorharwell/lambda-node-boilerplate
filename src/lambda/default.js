import { toSaga } from 'utils/lambda';
import { call } from 'redux-saga/effects';
import { consume } from 'di/effects';
import { initialize } from 'core/applicationContext';

export function* defaultSaga() {
  const { getRepositoryPage } = yield consume('githubGateway');
  const repositories = yield call(getRepositoryPage);
  return repositories;
}

export const handler = toSaga(defaultSaga, { initialize });
