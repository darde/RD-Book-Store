import { fork } from 'redux-saga/effects';
import { fetchBooks } from './fetchBooks';
import { watcher } from './watcher';

function* rootSaga() {
  yield [
    fork(fetchBooks),
    fork(watcher),
  ];
}

export default rootSaga;
