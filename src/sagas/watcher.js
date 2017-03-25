import { put, takeEvery } from 'redux-saga/effects';
import { searchKeyword } from './searchKeyword';
import {
  FETCH_BOOKS_FAILED,
  SEARCH_KEYWORD,
} from '../actions';

export function* watcher() {
  try {
    yield [
      takeEvery(SEARCH_KEYWORD, searchKeyword),
    ];
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED });
  }
}
