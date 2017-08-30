/* eslint-disable redux-saga/yield-effects */
import sinon from 'sinon';
import { call } from 'redux-saga/effects';
import { supplySaga, consumeSaga } from '../index';
import { supply, consume } from '../effects';

describe('supply effect', () => {
  it('returns correct descriptor', () => {
    const name = 'testName';
    const factory = sinon.spy();
    const options = { dependencies: [] };
    expect(supply(name, factory, options)).toEqual(call(supplySaga, name, factory, options));
  });
});

describe('consume effect', () => {
  it('returns correct descriptor', () => {
    const name = 'testName';
    expect(consume(name)).toEqual(call(consumeSaga, name));
  });
});
