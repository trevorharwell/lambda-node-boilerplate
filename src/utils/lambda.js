import { runSaga } from 'redux-saga';
import { call } from 'redux-saga/effects';

export const toSaga = (saga, { initializeEach, initialize, format, errorHandler } = {}) => {
  let didInitialize = false;
  function* wrapperSaga(...args) {
    if (!didInitialize && initialize) {
      yield call(initialize);
    }
    didInitialize = true;
    if (initializeEach) {
      yield call(initializeEach, ...args);
    }
    let response;
    try {
      response = yield call(saga, ...args);
      if (format) {
        response = yield call(format, response);
      }
    } catch (error) {
      if (errorHandler) {
        response = yield call(errorHandler, error);
      } else {
        throw error;
      }
    }
    return response;
  }
  return (event, context, callback) => {
    runSaga({ context }, wrapperSaga, event, context)
      .done
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error);
      });
  };
};
