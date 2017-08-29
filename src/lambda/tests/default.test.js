import { call } from 'redux-saga/effects';
import sinon from 'sinon';
import createGithubGateway from 'gateway/createGithubGateway';
import { defaultSaga } from '../default';

/* eslint-disable redux-saga/yield-effects */

describe('defaultSaga', () => {
  let saga;
  beforeEach(() => {
    saga = defaultSaga();
  });
  it('runs without error', () => {
    const getRepositoryPage = sinon.stub().returnsPromise();
    const response = [];

    expect(saga.next().value).toEqual(call(createGithubGateway));
    expect(saga.next({ getRepositoryPage }).value).toEqual(call(getRepositoryPage));
    expect(saga.next(response).value).toEqual(response);
  });
});
