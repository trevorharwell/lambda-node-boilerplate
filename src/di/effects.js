/* eslint-disable redux-saga/yield-effects */
import { call } from 'redux-saga/effects';
import { supplySaga, consumeSaga } from './index';


export const supply = (name, factory, options) => call(supplySaga, name, factory, options);

export const consume = (name) => call(consumeSaga, name);
