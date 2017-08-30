/* eslint-disable redux-saga/yield-effects */
import sinon from 'sinon';
import { call } from 'redux-saga/effects';
import { consume } from 'di/effects';
import createHttpResponse from 'model/createHttpResponse';
import { defaultSaga } from '../default';

describe('defaultSaga', () => {
  let saga;
  beforeEach(() => {
    saga = defaultSaga();
  });
  it('runs without error', () => {
    const getRepositoryPage = sinon.stub().returnsPromise();
    const repositories = [];
    const response = {};

    expect(saga.next().value).toEqual(consume('githubGateway'));
    expect(saga.next({ getRepositoryPage }).value).toEqual(call(getRepositoryPage));
    expect(saga.next(repositories).value).toEqual(call(createHttpResponse, repositories, 200));
    expect(saga.next(response).value).toBe(response);
  });
});
