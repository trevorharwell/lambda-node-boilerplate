import { call } from 'redux-saga/effects';

let instanceRegistry = {};
let factoryRegistry = {};

export const getInstance = (name) => instanceRegistry[name];
export const putInstance = (name, instance) => {
  instanceRegistry[name] = instance;
};
export const getFactory = (name) => factoryRegistry[name];
export const putFactory = (name, factory, options) => {
  factoryRegistry[name] = { ...options, factory };
};

export function* supplySaga(name, factory, options) {
  yield call(putFactory, name, factory, options);
}

export function* consumeSaga(name) {
  let instance = yield call(getInstance, name);
  if (instance) {
    return instance;
  }
  instance = yield call(buildInstanceSaga, name);
  return instance;
}

export function* buildInstanceSaga(name) {
  const factoryModel = yield call(getFactory, name);
  if (!factoryModel) {
    throw new Error(`Factory ${name} does not exist`);
  }
  const { factory, dependencies } = factoryModel;
  let factoryProps = {};
  if (dependencies) {
    factoryProps = yield call(resolveDependenciesSaga, dependencies);
  }
  const instance = yield call(factory, factoryProps);
  yield call(putInstance, name, instance);
  return instance;
}

export function* resolveDependenciesSaga(dependencies) {
  const normalizedDependencies = {};
  const resolvedDependencies = {};

  if (Array.isArray(dependencies)) {
    dependencies.forEach((name) => {
      normalizedDependencies[name] = name;
    });
  } else {
    Object.keys(dependencies).forEach((name) => {
      normalizedDependencies[name] = dependencies[name];
    });
  }

  const dependencyNames = Object.keys(normalizedDependencies);
  for (let i = 0; i < dependencyNames.length; i += 1) {
    const name = dependencyNames[i];
    const instance = yield call(consumeSaga, normalizedDependencies[name]);
    resolvedDependencies[name] = instance;
  }

  return resolvedDependencies;
}

export const clearInstances = () => {
  instanceRegistry = {};
};

export const clearFactories = () => {
  factoryRegistry = {};
};

export const clear = () => {
  clearInstances();
  clearFactories();
};
