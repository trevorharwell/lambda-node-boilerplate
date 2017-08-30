import { toSaga } from 'utils/lambda';
import { call } from 'redux-saga/effects';
import { consume } from 'di/effects';
import { initialize } from 'core/applicationContext';
import createHttpResponse from 'model/createHttpResponse';
import createHttpErrorResponse from 'model/createHttpErrorResponse';

export function* defaultSaga() {
  const { getRepositoryPage } = yield consume('githubGateway');
  const repositories = yield call(getRepositoryPage);
  const response = yield call(createHttpResponse, repositories, 200);

  return response;
}

export const handle = toSaga(defaultSaga, {
  initialize,
  errorHandler: createHttpErrorResponse,
});
