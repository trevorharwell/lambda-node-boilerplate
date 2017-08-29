import { runAsSaga } from 'utils/lambda';

export const defaultHandler = function* () {
  return {
    text: 'something',
  };
};

export const handler = runAsSaga(defaultHandler);
