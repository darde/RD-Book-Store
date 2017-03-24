import { fork } from 'redux-saga/effects';
import { fetchBooks } from './fetchBooks';

function* rootSaga() {
  yield [
    fork(fetchBooks),
  ];
}

export default rootSaga;
