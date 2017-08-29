import { runSaga } from 'redux-saga';
import { call } from 'redux-saga/effects';

export const runAsSaga = (saga, { initialize, format, errorHandler } = {}) => {
  function* wrapperSaga(...args) {
    if (initialize) {
      yield call(initialize, ...args);
    }
    const response = yield call(saga, ...args);
    return response;
  }
  return (event, context, callback) => {
    runSaga({ context }, wrapperSaga, event, context)
      .done
      .then(async (result) => {
        if (format) {
          const formattedResult = await format(result);
          callback(null, formattedResult);
        } else {
          callback(null, result);
        }
      })
      .catch(async (error) => {
        if (errorHandler) {
          try {
            const result = await errorHandler(error);
            callback(null, result);
          } catch (subError) {
            callback(subError);
          }
        } else {
          callback(error);
        }
      });
  };
};
