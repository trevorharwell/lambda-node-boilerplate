/* eslint-disable redux-saga/yield-effects */
import sinon from 'sinon';
import { call } from 'redux-saga/effects';
import {
  supplySaga,
  consumeSaga,
  buildInstanceSaga,
  resolveDependenciesSaga,
  getFactory,
  putFactory,
  getInstance,
  putInstance,
  clear,
} from '../index';

describe('di', () => {
  beforeEach(() => {
    clear();
  });
  describe('supplySaga', () => {
    it('should run', () => {
      const name = 'testName';
      const factory = sinon.spy();
      const saga = supplySaga(name, factory);

      expect(saga.next().value).toEqual(call(putFactory, name, factory, undefined));
    });
  });
  describe('consumeSaga', () => {
    it('should return registered instances', () => {
      const saga = consumeSaga('testName');
      const instance = {};

      expect(saga.next().value).toEqual(call(getInstance, 'testName'));
      expect(saga.next(instance).value).toBe(instance);
    });
    it('should build instance when instance does not exist', () => {
      const saga = consumeSaga('testName');
      const instance = {};

      expect(saga.next().value).toEqual(call(getInstance, 'testName'));
      expect(saga.next().value).toEqual(call(buildInstanceSaga, 'testName'));
      expect(saga.next(instance).value).toBe(instance);
    });
  });
  describe('buildInstanceSaga', () => {
    it('should throw an error when a factory does not exist', () => {
      const saga = buildInstanceSaga('testName');

      expect(saga.next().value).toEqual(call(getFactory, 'testName'));
      expect(() => saga.next()).toThrow();
    });
    it('should build an instance when a factory exists', () => {
      const saga = buildInstanceSaga('testName');
      const factory = sinon.spy();
      const instance = {};

      expect(saga.next().value).toEqual(call(getFactory, 'testName'));
      expect(saga.next({ factory }).value).toEqual(call(factory, {}));
      expect(saga.next(instance).value).toEqual(call(putInstance, 'testName', instance));
      expect(saga.next().value).toBe(instance);
    });
    it('should build dependencies', () => {
      const saga = buildInstanceSaga('testName');
      const factory = sinon.spy();
      const dependencies = {};
      const factoryProps = { test: true };

      expect(saga.next().value).toEqual(call(getFactory, 'testName'));
      expect(saga.next({ factory, dependencies }).value).toEqual(call(resolveDependenciesSaga, dependencies));
      expect(saga.next(factoryProps).value).toEqual(call(factory, factoryProps));
    });
  });
  describe('resolveDependenciesSaga', () => {
    it('resolves each dependecy in an array', () => {
      const testDep = {};
      const saga = resolveDependenciesSaga(['testDep']);

      expect(saga.next().value).toEqual(call(consumeSaga, 'testDep'));
      expect(saga.next(testDep).value).toEqual({ testDep });
    });
    it('resolves each dependecy in an object', () => {
      const testDep = {};
      const saga = resolveDependenciesSaga({ testDep: 'anotherName' });

      expect(saga.next().value).toEqual(call(consumeSaga, 'anotherName'));
      expect(saga.next(testDep).value).toEqual({ testDep });
    });
  });
  describe('getInstance', () => {
    it('gets instances that are put', () => {
      const instance = {};
      putInstance('testName', instance);
      expect(getInstance('testName')).toBe(instance);
    });
  });
  describe('getFactory', () => {
    it('gets factories that are put', () => {
      const factory = sinon.spy();
      putFactory('testName', factory, { dependencies: [] });
      expect(getFactory('testName')).toEqual({
        factory,
        dependencies: [],
      });
    });
  });
});
