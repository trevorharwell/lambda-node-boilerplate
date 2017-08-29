import sinon from 'sinon';

import { runAsSaga } from '../lambda';

describe('runAsSaga', () => {
  it('calls callback with saga response', (done) => {
    const saga = function* () { return 'hello'; };
    const wrappedSaga = runAsSaga(saga);
    const event = { event: true };
    const context = { context: true };

    wrappedSaga(event, context, (error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual('hello');
      done();
    });
  });
  it('calls callback with formatted saga response', (done) => {
    const saga = function* () { return 'hello'; };
    const format = sinon.stub().returns('nope');
    const wrappedSaga = runAsSaga(saga, { format });
    const event = { event: true };
    const context = { context: true };

    wrappedSaga(event, context, (error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual('nope');
      sinon.assert.calledWith(format, 'hello');
      done();
    });
  });
  it('calls initialize', (done) => {
    const saga = function* () { return 'hello'; };
    const initialize = sinon.spy();
    const wrappedSaga = runAsSaga(saga, { initialize });
    const event = { event: true };
    const context = { context: true };

    wrappedSaga(event, context, (error, result) => {
      sinon.assert.calledWith(initialize, event, context);
      expect(error).toBeNull();
      expect(result).toEqual('hello');
      done();
    });
  });
  it('calls callback with error', (done) => {
    const thrownError = new Error();
    const saga = function* () { throw thrownError; };
    const wrappedSaga = runAsSaga(saga);
    const event = { event: true };
    const context = { context: true };

    wrappedSaga(event, context, (error) => {
      expect(error).toBe(thrownError);
      done();
    });
  });
  it('calls callback with handled error', (done) => {
    const thrownError = new Error();
    const errorHandler = sinon.stub().returns('nope');
    const saga = function* () { throw thrownError; };
    const wrappedSaga = runAsSaga(saga, { errorHandler });
    const event = { event: true };
    const context = { context: true };

    wrappedSaga(event, context, (error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual('nope');
      sinon.assert.calledWith(errorHandler, thrownError);
      done();
    });
  });
  it('calls callback with error from error handler', (done) => {
    const thrownError = new Error();
    const subError = new Error();
    const errorHandler = sinon.stub().throws(subError);
    const saga = function* () { throw thrownError; };
    const wrappedSaga = runAsSaga(saga, { errorHandler });
    const event = { event: true };
    const context = { context: true };

    wrappedSaga(event, context, (error) => {
      expect(error).toBe(subError);
      done();
    });
  });
});
