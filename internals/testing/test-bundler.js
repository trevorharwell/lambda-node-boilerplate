// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);
