import { fork } from 'redux-saga/effects';
import { watcher } from './watcher';

function* rootSaga() {
  yield [
    fork(watcher),
  ];
}

export default rootSaga;
